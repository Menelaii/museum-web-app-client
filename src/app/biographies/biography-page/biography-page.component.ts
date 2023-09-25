import {Component, ViewChild} from '@angular/core';
import {Observer, Subscription} from "rxjs";
import {BiographyDTO} from "../../shared/interfaces/biographies/biography.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {BiographiesService} from "../../shared/services/biographies.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MedalDetailsDTO} from "../../shared/interfaces/details/medal-details.dto";
import {
  FullscreenImageViewComponent
} from "../../shared/components/fullscreen-image-view/fullscreen-image-view.component";

@Component({
  selector: 'app-biography-page',
  templateUrl: './biography-page.component.html',
  styleUrls: ['./biography-page.component.scss']
})
export class BiographyPageComponent {
  @ViewChild('fullscreenImageView') fullscreenImageView!: FullscreenImageViewComponent;

  private routeSubscription: Subscription;
  private dataSubscription: Subscription | undefined;

  isLoading = true;
  biography: BiographyDTO | undefined;
  selectedMedal: MedalDetailsDTO | null = null;

  constructor(private route: ActivatedRoute,
              private service: BiographiesService,
              private router: Router) {

    this.routeSubscription = this.route.params.subscribe(params => {
      const id = params['id'];

      const observer: Observer<BiographyDTO> =  {
        next: (value: BiographyDTO) => {
          this.biography = value;
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse ) => {
          this.router.navigate(['/error'], { state: error })
        },
        complete: () => {
        }
      }

      this.dataSubscription = service.getById(id).subscribe(observer);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.dataSubscription?.unsubscribe();
  }

  onViewPresentationClick() {
    if (this.biography && this.biography.presentation) {
      window.location.href = this.biography.presentation.uri;
    }
  }

  onMedalClick(medalDetails: MedalDetailsDTO) {
    this.selectedMedal = this.selectedMedal === medalDetails
      ? null
      : medalDetails;
  }
}
