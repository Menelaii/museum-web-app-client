import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MedalShortDTO} from "../../../../shared/interfaces/medals/medal-short.dto";
import {FormArrayController} from "../../../shared/form-array-controller";
import {DateFormatService} from "../../../shared/services/date-format.service";
import {MedalDetailsDTO} from "../../../../shared/interfaces/details/medal-details.dto";

@Component({
  selector: 'app-edit-medal-details-form-array',
  templateUrl: './edit-medal-details-form-array.component.html',
  styleUrls: ['./edit-medal-details-form-array.component.scss']
})
export class EditMedalDetailsFormArrayComponent implements OnInit {
  @Input() subForm!: FormGroup;
  @Input() medals!: MedalShortDTO[];
  @Input() medalDetails!: MedalDetailsDTO[];

  formArrayController!: FormArrayController<FormGroup>;

  constructor(private dateFormatService: DateFormatService) {
  }

  ngOnInit() {
    if (this.formArrayController) {
      this.formArrayController.reset();
    }

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

    this.patchValues(this.medalDetails);
  }

  patchValues(details: MedalDetailsDTO[]) {
    for (let detail of details) {
      this.formArrayController.addControl(
        this.dtoToSubform(detail)
      );
    }
  }

  dtoToSubform(detail: MedalDetailsDTO): FormGroup {
    return new FormGroup({
      dateOfAward: new FormControl(this.dateFormatService.transform(detail.dateOfAward)),
      placeOfAward: new FormControl(detail.placeOfAward),
      medal: new FormControl(detail.medal.id, [
        Validators.required
      ]),
    })
  }
}
