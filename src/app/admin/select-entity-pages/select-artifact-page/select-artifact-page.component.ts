import {Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {PageDTO} from "../../../shared/interfaces/pagination/page.dto";
import {ArtifactShortDTO} from "../../../shared/interfaces/artifacts/artifact-short.dto";
import {XPage} from "../../../shared/interfaces/pagination/x-page";
import {ArtifactsService} from "../../../shared/services/artifacts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectPage} from "../../shared/select-page";

@Component({
  selector: 'app-select-artifact-page',
  templateUrl: './select-artifact-page.component.html',
  styleUrls: ['./select-artifact-page.component.scss']
})
export class SelectArtifactPageComponent extends SelectPage<ArtifactShortDTO, ArtifactsService> implements OnDestroy {
  private routeSubscription: Subscription;

  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  artifacts$!: Observable<PageDTO<ArtifactShortDTO>>;

  pagination: XPage = {
    itemsPerPage: 10,
    page: 1
  }

  constructor(private route: ActivatedRoute) {
    super(inject(Router), inject(ArtifactsService));

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.pagination.page = params['page'] || this.pagination.page;
      this.entities$ = this.getAllEntities();
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  getAllEntities(): Observable<ArtifactShortDTO[]> {
    this.artifacts$ = this.service.getAllWithFilters(this.pagination, {});
    return this.artifacts$.pipe(
      map((pageDTO: PageDTO<ArtifactShortDTO>) => pageDTO.models)
    );
  }

  onDelete(id: number): void {
    this.service.delete(id).subscribe(()=>{
      this.entities$ = this.getAllEntities();
    });
  }

  buildDeleteMessage(entity: ArtifactShortDTO): string {
    return `Вы действительно хотите удалить предмет: ${entity.title}?`
  }
}
