import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormArrayController} from "../../../shared/form-array-controller";
import {MedalShortDTO} from "../../../../shared/interfaces/medals/medal-short.dto";

@Component({
  selector: 'app-medal-details-form-array',
  templateUrl: './medal-details-form-array.component.html',
  styleUrls: ['./medal-details-form-array.component.scss']
})
export class MedalDetailsFormArrayComponent implements OnInit {
  @Input() subForm!: FormGroup;
  @Input() medals!: MedalShortDTO[];

  formArrayController!: FormArrayController<FormGroup>;

  ngOnInit() {
    this.formArrayController = new FormArrayController(
      this.subForm,
      'medalDetailsArray',
      () => new FormGroup({
        dateOfAward: new FormControl(),
        placeOfAward: new FormControl(),
        medal: new FormControl(null, [
          Validators.required
        ]),
      })
    );
  }
}
