import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormArrayController} from "../../../shared/form-array-controller";
import {MilitaryRankShortDTO} from "../../../../shared/interfaces/military-ranks/military-rank-short.dto";

@Component({
  selector: 'app-military-rank-details-form-array',
  templateUrl: './military-rank-details-form-array.component.html',
  styleUrls: ['./military-rank-details-form-array.component.scss']
})
export class MilitaryRankDetailsFormArrayComponent implements OnInit {
  @Input() subForm!: FormGroup;
  @Input() ranks!: MilitaryRankShortDTO[];

  formArrayController!: FormArrayController<FormGroup>;

  ngOnInit() {
    this.formArrayController = new FormArrayController(
      this.subForm,
      'militaryRankDetailsArray',
      () =>           new FormGroup({
        dateOfAssigment: new FormControl(),
        rank: new FormControl(null, [
          Validators.required
        ]),
      })
    );
  }
}
