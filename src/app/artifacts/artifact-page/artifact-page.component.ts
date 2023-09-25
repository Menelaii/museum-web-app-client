import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observer, Subscription} from "rxjs";
import {ArtifactsService} from "../../shared/services/artifacts.service";
import {ArtifactDTO} from "../../shared/interfaces/artifacts/artifact.dto";
import {HttpErrorResponse} from "@angular/common/http";
import {artifactTypeTranslations} from "../../shared/enums/artifact-type-translations";
import {valueCategoryTranslations} from "../../shared/enums/value-category-translations";
import {
  FullscreenImageViewComponent
} from "../../shared/components/fullscreen-image-view/fullscreen-image-view.component";

@Component({
  selector: 'app-artifact-page',
  templateUrl: './artifact-page.component.html',
  styleUrls: ['./artifact-page.component.scss']
})
export class ArtifactPageComponent implements OnDestroy {
  @ViewChild('fullscreenImageView') fullscreenImageView!: FullscreenImageViewComponent;

  private routeSubscription: Subscription;
  private dataSubscription: Subscription | undefined;

  artifact: ArtifactDTO | undefined;
  isLoading = true
  typeTranslations = artifactTypeTranslations
  valueCategoryTranslations = valueCategoryTranslations;

  constructor(private route: ActivatedRoute,
              private service: ArtifactsService,
              private router: Router) {

    this.routeSubscription = this.route.params.subscribe(params => {
      const id = params['id'];

      const observer: Observer<ArtifactDTO> =  {
        next: (value: ArtifactDTO) => {
          this.artifact = value;
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

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.dataSubscription?.unsubscribe();
  }
}
