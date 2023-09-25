import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormArrayController} from "../../shared/form-array-controller";

@Component({
  selector: 'app-career-details-form-array',
  templateUrl: './career-details-form-array.component.html',
  styleUrls: ['./career-details-form-array.component.scss']
})
export class CareerDetailsFormArrayComponent implements OnInit {
  @Input() subForm!: FormGroup;
  @Input() label!: string;

  formArrayController!: FormArrayController<FormGroup>;

  ngOnInit() {
    this.formArrayController = new FormArrayController(
      this.subForm,
      'careerDetailsArray',
      () => new FormGroup({
        placeOfService: new FormControl(null, [
          Validators.required
        ]),
        position: new FormControl(null, [
          Validators.required
        ]),
        startDate: new FormControl(),
        endDate: new FormControl(),
      })
    );
  }
}
