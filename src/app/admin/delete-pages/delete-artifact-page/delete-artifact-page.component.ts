import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ArtifactsService} from "../../../shared/services/artifacts.service";
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {PageDTO} from "../../../shared/interfaces/pagination/page.dto";
import {XPage} from "../../../shared/interfaces/pagination/x-page";
import {ArtifactShortDTO} from "../../../shared/interfaces/artifacts/artifact-short.dto";

@Component({
  selector: 'app-delete-artifact-page',
  templateUrl: './delete-artifact-page.component.html',
  styleUrls: ['./delete-artifact-page.component.scss']
})
export class DeleteArtifactPageComponent implements OnDestroy {
  private routeSubscription: Subscription;

  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  biographies$!: Observable<PageDTO<ArtifactShortDTO>>;
  selectedModel: ArtifactShortDTO | null;
  pagination: XPage = {
    itemsPerPage: 10,
    page: 1
  }

  constructor(private service: ArtifactsService, private route: ActivatedRoute) {
    this.selectedModel = null;
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.pagination.page = params['page'] || this.pagination.page;
      this.biographies$ = this.service.getAllWithFilters(this.pagination, {});
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onModelClick(model: ArtifactShortDTO) {
    this.selectedModel = model;
    const onConfirmedBound = this.onConfirmed.bind(this);
    this.messageBox.open(this.buildMessage(model), onConfirmedBound);
  }

  buildMessage(model: ArtifactShortDTO): string {
    return `Вы действительно хотите удалить предмет: ${model.title}?`
  }

  onConfirmed(confirmed: boolean) {
    if (confirmed && this.selectedModel) {
      this.service.delete(this.selectedModel.id).subscribe(()=>{
        this.biographies$ = this.service.getAllWithFilters(this.pagination, {});
      });
    }
  }
}
