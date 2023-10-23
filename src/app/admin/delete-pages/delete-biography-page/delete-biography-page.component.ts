import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BiographiesService} from "../../../shared/services/biographies.service";
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {Observable, Subscription} from "rxjs";
import {PageDTO} from "../../../shared/interfaces/pagination/page.dto";
import {XPage} from "../../../shared/interfaces/pagination/x-page";
import {BiographyShortDTO} from "../../../shared/interfaces/biographies/biography-short.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-delete-biography-page',
  templateUrl: './delete-biography-page.component.html',
  styleUrls: ['./delete-biography-page.component.scss']
})
export class DeleteBiographyPageComponent implements OnDestroy {
  private routeSubscription: Subscription;

  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  biographies$!: Observable<PageDTO<BiographyShortDTO>>;
  selectedModel: BiographyShortDTO | null;
  pagination: XPage = {
    itemsPerPage: 10,
    page: 1
  }

  constructor(private service: BiographiesService, private route: ActivatedRoute) {
    this.selectedModel = null;
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.pagination.page = params['page'] || this.pagination.page;
      this.biographies$ = this.service.getAllWithFilters(this.pagination, {});
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  onModelClick(model: BiographyShortDTO) {
    this.selectedModel = model;
    const onConfirmedBound = this.onConfirmed.bind(this);
    this.messageBox.open(this.buildMessage(model), onConfirmedBound);
  }

  buildMessage(model: BiographyShortDTO): string {
    return `Вы действительно хотите удалить биографию: ${model.surname} ${model.name}?`
  }

  onConfirmed(confirmed: boolean) {
    if (confirmed && this.selectedModel) {
      this.service.delete(this.selectedModel.id).subscribe(()=>{
        this.biographies$ = this.service.getAllWithFilters(this.pagination, {});
      });
    }
  }
}
