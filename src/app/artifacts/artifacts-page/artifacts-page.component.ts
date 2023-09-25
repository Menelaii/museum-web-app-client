import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ArtifactsSearchCriteria} from "../../shared/interfaces/artifacts/artifacts-search-criteria";
import {Observer, Subscription} from "rxjs";
import {XPage} from "../../shared/interfaces/pagination/x-page";
import {HttpErrorResponse} from "@angular/common/http";
import {ArtifactsService} from "../../shared/services/artifacts.service";
import {ArtifactShortDTO} from "../../shared/interfaces/artifacts/artifact-short.dto";
import {PageDTO} from "../../shared/interfaces/pagination/page.dto";

@Component({
  selector: 'app-artifacts-page',
  templateUrl: './artifacts-page.component.html',
  styleUrls: ['./artifacts-page.component.scss']
})
export class ArtifactsPageComponent implements OnDestroy {
  private routeSubscription: Subscription;
  private dataSubscription: Subscription | undefined;
  private fakeDelay = 200;

  isLoading = true;
  content: ArtifactShortDTO[] = [];
  totalElements = 0;
  pagination: XPage = {page: 1, itemsPerPage: 8}
  cachedPages: Map<string, PageDTO<ArtifactShortDTO>> = new Map<string, PageDTO<ArtifactShortDTO>>();

  constructor(private service: ArtifactsService,
              private route: ActivatedRoute,
              private router: Router) {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.onParametersChanged(params);
    });
  }

  fetch(page: XPage, searchCriteria: ArtifactsSearchCriteria) {
    this.isLoading = true;

    const currentURL = window.location.href;

    const cachedPage: PageDTO<ArtifactShortDTO> | undefined = this.cachedPages.get(currentURL);
    if (cachedPage) {
      this.content = cachedPage.models;
      this.totalElements = cachedPage.totalElements;

      setTimeout(() => {
        this.isLoading = false;
      }, this.fakeDelay);

      return;
    }

    const observer: Observer<PageDTO<ArtifactShortDTO>> =  {
      next: (value: PageDTO<ArtifactShortDTO>) => {
        this.content = value.models;
        this.totalElements = value.totalElements;
        this.cachedPages.set(currentURL, value);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse ) => {
        this.router.navigate(['/error'], { state: error })
      },
      complete: () => {
      }
    }

    this.dataSubscription = this.service.getAllWithFilters(page, searchCriteria).subscribe(observer);
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  onArtifactClick(artifact: ArtifactShortDTO) {
    this.router.navigate(['artifacts', artifact.id]);
  }


  onParametersChanged(params: Params) {
    const searchCriteria: ArtifactsSearchCriteria = {
      title: params['title'] || null,
      artifactType: params['artifactType'] || null,
      valueCategory: params['valueCategory'] || null,
    };

    this.pagination.page = params['page'] || this.pagination.page;

    this.fetch(this.pagination, searchCriteria);
  }
}
