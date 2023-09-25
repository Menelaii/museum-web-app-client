import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-career-details-form',
  templateUrl: './career-details-form.component.html',
  styleUrls: ['./career-details-form.component.scss']
})
export class CareerDetailsFormComponent {
  @Input() subform!: FormGroup;
}
