import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MedalShortDTO} from "../../../../shared/interfaces/medals/medal-short.dto";

@Component({
  selector: 'app-medal-details-form',
  templateUrl: './medal-details-form.component.html',
  styleUrls: ['./medal-details-form.component.scss']
})
export class MedalDetailsFormComponent {
  @Input() subform!: FormGroup;
  @Input() medals!: MedalShortDTO[]
}
