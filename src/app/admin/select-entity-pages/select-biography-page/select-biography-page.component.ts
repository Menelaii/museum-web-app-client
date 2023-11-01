import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {PageDTO} from "../../../shared/interfaces/pagination/page.dto";
import {BiographyShortDTO} from "../../../shared/interfaces/biographies/biography-short.dto";
import {XPage} from "../../../shared/interfaces/pagination/x-page";
import {BiographiesService} from "../../../shared/services/biographies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectPage} from "../../shared/select-page";

@Component({
  selector: 'app-select-biography-page',
  templateUrl: './select-biography-page.component.html',
  styleUrls: ['./select-biography-page.component.scss']
})
export class SelectBiographyPageComponent extends SelectPage<BiographyShortDTO, BiographiesService> implements OnDestroy {
  private routeSubscription: Subscription;

  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  biographies$!: Observable<PageDTO<BiographyShortDTO>>;

  pagination: XPage = {
    itemsPerPage: 10,
    page: 1
  }

  constructor(private route: ActivatedRoute) {
    super(inject(Router), inject(BiographiesService));

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.pagination.page = params['page'] || this.pagination.page;
      this.entities$ = this.getAllEntities();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  getAllEntities(): Observable<BiographyShortDTO[]> {
    this.biographies$ = this.service.getAllWithFilters(this.pagination, {});
    return this.biographies$.pipe(
      map((pageDTO: PageDTO<BiographyShortDTO>) => pageDTO.models)
    );
  }

  buildDeleteMessage(entity: BiographyShortDTO): string {
    return `Вы действительно хотите удалить биографию: ${entity.surname} ${entity.name}?`
  }

  buildEditMessage(entity: BiographyShortDTO): string {
    return `Редактировать биографию: ${entity.surname} ${entity.name}?`
  }

  onDelete(id: number): void {
    this.service.delete(id).subscribe(()=>{
      this.biographies$ = this.service.getAllWithFilters(this.pagination, {});
    });
  }
}
