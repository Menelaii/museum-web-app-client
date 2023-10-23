import {Component, ViewChild} from '@angular/core';
import {
  ConfirmationMessageBoxComponent
} from "../../shared/components/confirmation-message-box/confirmation-message-box.component";
import {Observable} from "rxjs";
import {MedalShortDTO} from "../../../shared/interfaces/medals/medal-short.dto";
import {MilitaryRankShortDTO} from "../../../shared/interfaces/military-ranks/military-rank-short.dto";
import {MilitaryRanksService} from "../../../shared/services/military-ranks.service";

@Component({
  selector: 'app-delete-rank-page',
  templateUrl: './delete-rank-page.component.html',
  styleUrls: ['./delete-rank-page.component.scss']
})
export class DeleteRankPageComponent {
  @ViewChild(ConfirmationMessageBoxComponent) messageBox!: ConfirmationMessageBoxComponent;

  ranks$!: Observable<MilitaryRankShortDTO[]>;
  selectedRank: MedalShortDTO | null;

  constructor(private service: MilitaryRanksService) {
    this.selectedRank = null;
    this.ranks$ = service.getAll();
  }

  onRankClick(medal: MedalShortDTO) {
    this.selectedRank = medal;
    const onConfirmedBound = this.onConfirmed.bind(this);
    this.messageBox.open(this.buildMessage(medal), onConfirmedBound);
  }

  buildMessage(medal: MedalShortDTO): string {
    return `Вы действительно хотите удалить звание: ${medal.title}?`
  }

  onConfirmed(confirmed: boolean) {
    if (confirmed && this.selectedRank) {
      this.service.delete(this.selectedRank.id).subscribe(()=>{
        this.ranks$ = this.service.getAll();
      });
    }
  }
}
