import {Component, OnDestroy} from '@angular/core';
import {Observable, Observer, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ArticleDTO} from "../../shared/interfaces/news/article.dto";
import {ArticlesService} from "../../shared/services/articles.service";

@Component({
  selector: 'app-news-article-page',
  templateUrl: './news-article-page.component.html',
  styleUrls: ['./news-article-page.component.scss']
})
export class NewsArticlePageComponent implements OnDestroy {
  private routeSubscription: Subscription;
  private dataSubscription: Subscription | undefined;

  article: ArticleDTO | undefined;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private service: ArticlesService,
              private router: Router) {

    this.routeSubscription = this.route.params.subscribe(params => {
      const id = params['id'];

      const observer: Observer<ArticleDTO> =  {
        next: (value: ArticleDTO) => {
          this.article = value;
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
