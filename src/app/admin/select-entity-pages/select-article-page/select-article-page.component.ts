import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, Subscription} from "rxjs";
import {SelectPage} from "../../shared/select-page";
import {ArticleShortDTO} from "../../../shared/interfaces/news/article-short.dto";
import {ArticlesService} from "../../../shared/services/articles.service";
import {PageDTO} from "../../../shared/interfaces/pagination/page.dto";
import {XPage} from "../../../shared/interfaces/pagination/x-page";

@Component({
  selector: 'app-select-article-page',
  templateUrl: './select-article-page.component.html',
  styleUrls: ['./select-article-page.component.scss']
})
export class SelectArticlePageComponent extends SelectPage<ArticleShortDTO, ArticlesService> implements OnDestroy {
  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  routeSubscription: Subscription;

  articles$!: Observable<PageDTO<ArticleShortDTO>>;

  pagination: XPage = {
    itemsPerPage: 10,
    page: 1
  }

  constructor(private route: ActivatedRoute) {
    super(inject(Router), inject(ArticlesService));

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.pagination.page = params['page'] || this.pagination.page;
      this.entities$ = this.getAllEntities();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  getAllEntities(): Observable<ArticleShortDTO[]> {
    this.articles$ = this.service.getAllWithFilters(this.pagination, {});
    return this.articles$.pipe(
      map((pageDTO: PageDTO<ArticleShortDTO>) => pageDTO.models)
    );
  }

  buildDeleteMessage(entity: ArticleShortDTO): string {
    return `Вы действительно хотите удалить новость: ${entity.title}?`
  }

  buildEditMessage(entity: ArticleShortDTO): string {
    return `Редактировать новость: ${entity.title}?`
  }

  onDelete(id: number): void {
    this.service.delete(id).subscribe(()=> {
      this.entities$ = this.getAllEntities()
    });
  }
}
