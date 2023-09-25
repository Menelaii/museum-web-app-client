import {Component, OnDestroy} from '@angular/core';
import {ArticleShortDTO} from "../../shared/interfaces/news/article-short.dto";
import {Observer, Subscription} from "rxjs";
import {XPage} from "../../shared/interfaces/pagination/x-page";
import {PageDTO} from "../../shared/interfaces/pagination/page.dto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticlesService} from "../../shared/services/articles.service";
import {ArticlesSearchCriteria} from "../../shared/interfaces/news/articles-search-criteria";

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnDestroy  {
  private routeSubscription: Subscription;
  private dataSubscription: Subscription | undefined;
  private fakeDelay = 200;

  isLoading = true;
  content: ArticleShortDTO[] = [];
  totalElements = 0;
  pagination: XPage = {page: 1, itemsPerPage: 12}
  cachedPages: Map<string, PageDTO<ArticleShortDTO>> = new Map<string, PageDTO<ArticleShortDTO>>();

  constructor(private service: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.onParametersChanged(params);
    });
  }

  fetch(page: XPage, searchCriteria: ArticlesSearchCriteria) {
    this.isLoading = true;

    const currentURL = window.location.href;

    const cachedPage: PageDTO<ArticleShortDTO> | undefined = this.cachedPages.get(currentURL);
    if (cachedPage) {
      this.content = cachedPage.models;
      this.totalElements = cachedPage.totalElements;

      setTimeout(() => {
        this.isLoading = false;
      }, this.fakeDelay);

      return;
    }

    const observer: Observer<PageDTO<ArticleShortDTO>> =  {
      next: (value: PageDTO<ArticleShortDTO>) => {
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

  onNewsClick(article: ArticleShortDTO) {
    this.router.navigate(['news', article.id]);
  }


  onParametersChanged(params: Params) {
    const searchCriteria: ArticlesSearchCriteria = {
      year: params['year'] || null,
      month: params['month'] || null,
    };

    this.pagination.page = params['page'] || this.pagination.page;

    this.fetch(this.pagination, searchCriteria);
  }
}
