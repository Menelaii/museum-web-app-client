import {Component, OnDestroy, ViewChild} from '@angular/core';
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {ArticlesService} from "../../../shared/services/articles.service";
import {Observable, Subscription} from "rxjs";
import {ArticleShortDTO} from "../../../shared/interfaces/news/article-short.dto";
import {XPage} from "../../../shared/interfaces/pagination/x-page";
import {PageDTO} from "../../../shared/interfaces/pagination/page.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-delete-article-confirmation-page',
  templateUrl: './delete-article-confirmation-page.component.html',
  styleUrls: ['./delete-article-confirmation-page.component.scss']
})
export class DeleteArticleConfirmationPageComponent implements OnDestroy {
  private routeSubscription: Subscription;

  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  articles$!: Observable<PageDTO<ArticleShortDTO>>;
  selectedModel: ArticleShortDTO | null;
  pagination: XPage = {
    itemsPerPage: 10,
    page: 1
  }

  constructor(private service: ArticlesService, private route: ActivatedRoute) {
    this.selectedModel = null;
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.pagination.page = params['page'] || this.pagination.page;
      this.articles$ = this.service.getAllWithFilters(this.pagination, {});
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onModelClick(model: ArticleShortDTO) {
    this.selectedModel = model;
    const onConfirmedBound = this.onConfirmed.bind(this);
    this.messageBox.open(this.buildMessage(model), onConfirmedBound);
  }

  buildMessage(model: ArticleShortDTO): string {
    return `Вы действительно хотите удалить новость: ${model.title}?`
  }

  onConfirmed(confirmed: boolean) {
    if (confirmed && this.selectedModel) {
      this.service.delete(this.selectedModel.id).subscribe(()=>{
        this.articles$ = this.service.getAllWithFilters(this.pagination, {});
      });
    }
  }
}
