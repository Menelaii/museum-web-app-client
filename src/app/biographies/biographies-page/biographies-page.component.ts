import {Component, OnDestroy, OnInit} from '@angular/core';
import {BiographiesService} from "../../shared/services/biographies.service";
import {Observer, Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BiographyShortDTO} from "../../shared/interfaces/biographies/biography-short.dto";
import {BiographiesSearchCriteria} from "../../shared/interfaces/biographies/biographies-search-criteria";
import {XPage} from "../../shared/interfaces/pagination/x-page";
import {PageDTO} from "../../shared/interfaces/pagination/page.dto";

@Component({
  selector: 'app-biographies-page',
  templateUrl: './biographies-page.component.html',
  styleUrls: ['./biographies-page.component.scss']
})
export class BiographiesPageComponent implements OnDestroy {
  private routeSubscription: Subscription;
  private dataSubscription: Subscription | undefined;
  private fakeDelay = 200;

  isLoading = true;

  pagination: XPage = {page: 1, itemsPerPage: 6}
  totalElements = 0;

  content: BiographyShortDTO[] = [];
  cachedPages: Map<string, PageDTO<BiographyShortDTO>> = new Map<string, PageDTO<BiographyShortDTO>>();

  constructor(private service: BiographiesService,
              private route: ActivatedRoute,
              private router: Router) {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.onParametersChanged(params);
    });
  }

  fetch(page: XPage, searchCriteria: BiographiesSearchCriteria) {
    this.isLoading = true;

    const currentURL = window.location.href;

    const cachedPage: PageDTO<BiographyShortDTO> | undefined = this.cachedPages.get(currentURL);
    if (cachedPage) {
      this.content = cachedPage.models;
      this.totalElements = cachedPage.totalElements;

      setTimeout(() => {
        this.isLoading = false;
      }, this.fakeDelay);

      return;
    }

    const observer: Observer<PageDTO<BiographyShortDTO>> =  {
      next: (value: PageDTO<BiographyShortDTO>) => {
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

    this.dataSubscription =
      this.service.getAllWithFilters(page, searchCriteria).subscribe(observer);
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  onBiographyClick(biography: BiographyShortDTO) {
    this.router.navigate(['biographies', biography.id]);
  }

  onParametersChanged(params: Params) {
    const biographiesSearchCriteria: BiographiesSearchCriteria = {
      surname: params['surname'] || null,
      name: params['name'] || null,
      patronymic: params['patronymic'] || null,
      dateOfBirth: params['dateOfBirth'] || null,
      dateOfDeath: params['dateOfDeath'] || null,
      placeOfBirth: params['placeOfBirth'] || null,
      placeOfDeath: params['placeOfDeath'] || null,
      militaryRank: params['militaryRank'] || null,
      medal: params['medal'] || null,
      placeOfService: params['placeOfService'] || null,
      placeOfEmployment: params['placeOfEmployment'] || null,
    };

    this.pagination.page = params['page'] || this.pagination.page;

    this.fetch(this.pagination, biographiesSearchCriteria);
  }
}
