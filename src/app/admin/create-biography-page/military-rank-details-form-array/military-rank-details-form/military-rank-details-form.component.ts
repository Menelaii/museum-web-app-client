import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MilitaryRankShortDTO} from "../../../../shared/interfaces/military-ranks/military-rank-short.dto";

@Component({
  selector: 'app-military-rank-details-form',
  templateUrl: './military-rank-details-form.component.html',
  styleUrls: ['./military-rank-details-form.component.scss']
})
export class MilitaryRankDetailsFormComponent {
  @Input() subform!: FormGroup;
  @Input() ranks!: MilitaryRankShortDTO[]
}
