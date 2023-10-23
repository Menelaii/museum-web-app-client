import {Component, ViewChild} from '@angular/core';
import {MedalsService} from "../../../shared/services/medals.service";
import {MedalShortDTO} from "../../../shared/interfaces/medals/medal-short.dto";
import {Observable} from "rxjs";
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";

@Component({
  selector: 'app-delete-medal-page',
  templateUrl: './delete-medal-page.component.html',
  styleUrls: ['./delete-medal-page.component.scss']
})
export class DeleteMedalPageComponent {
  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  medals$!: Observable<MedalShortDTO[]>;
  selectedMedal: MedalShortDTO | null;

  constructor(private service: MedalsService) {
    this.selectedMedal = null;
    this.medals$ = service.getAll();
  }

  onMedalClick(medal: MedalShortDTO) {
    this.selectedMedal = medal;
    const onConfirmedBound = this.onConfirmed.bind(this);
    this.messageBox.open(this.buildMessage(medal), onConfirmedBound);
  }

  buildMessage(medal: MedalShortDTO): string {
    return `Вы действительно хотите удалить награду: ${medal.title}?`
  }

  onConfirmed(confirmed: boolean) {
    if (confirmed && this.selectedMedal) {
      this.service.delete(this.selectedMedal.id).subscribe(()=>{
        this.medals$ = this.service.getAll();
      });
    }
  }
}
