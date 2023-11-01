import {Component, inject, ViewChild} from '@angular/core';
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {Observable} from "rxjs";
import {MilitaryRankShortDTO} from "../../../shared/interfaces/military-ranks/military-rank-short.dto";
import {MilitaryRanksService} from "../../../shared/services/military-ranks.service";
import {SelectPage} from "../../shared/select-page";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-rank-page',
  templateUrl: './select-rank-page.component.html',
  styleUrls: ['./select-rank-page.component.scss']
})
export class SelectRankPageComponent extends SelectPage<MilitaryRankShortDTO, MilitaryRanksService>{
  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  constructor() {
    super(inject(Router), inject(MilitaryRanksService));
  }

  getAllEntities(): Observable<MilitaryRankShortDTO[]> {
    return this.service.getAll();
  }

  buildDeleteMessage(entity: MilitaryRankShortDTO): string {
    return `Вы действительно хотите удалить звание: ${entity.title}?`
  }

  buildEditMessage(entity: MilitaryRankShortDTO): string {
    return `Редактировать звание: ${entity.title}?`
  }

  onDelete(id: number): void {
    this.service.delete(id).subscribe(()=>{
      this.entities$ = this.service.getAll();
    });
  }
}
