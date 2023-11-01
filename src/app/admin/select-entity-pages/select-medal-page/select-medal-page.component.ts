import {Component, inject, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MedalShortDTO} from "../../../shared/interfaces/medals/medal-short.dto";
import {MedalsService} from "../../../shared/services/medals.service";
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {Router} from "@angular/router";
import {SelectPage} from "../../shared/select-page";

@Component({
  selector: 'app-select-medal-page',
  templateUrl: './select-medal-page.component.html',
  styleUrls: ['./select-medal-page.component.scss']
})
export class SelectMedalPageComponent extends SelectPage<MedalShortDTO, MedalsService> {
  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  constructor() {
    super(inject(Router), inject(MedalsService));
  }

  getAllEntities(): Observable<MedalShortDTO[]> {
      return this.service.getAll();
  }

  buildDeleteMessage(entity: MedalShortDTO): string {
    return `Удалить награду: ${entity.title}?`
  }

  buildEditMessage(entity: MedalShortDTO): string {
    return `Редактировать награду: ${entity.title}?`
  }

  onDelete(id: number): void {
    this.service.delete(id).subscribe(()=> {
      this.entities$ = this.service.getAll();
    });
  }
}
