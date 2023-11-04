import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MilitaryRankShortDTO} from "../../../../shared/interfaces/military-ranks/military-rank-short.dto";
import {FormArrayController} from "../../../shared/form-array-controller";
import {DateFormatService} from "../../../shared/services/date-format.service";
import {MilitaryRankDetailsDTO} from "../../../../shared/interfaces/details/military-rank-details.dto";

@Component({
  selector: 'app-edit-military-rank-details-form-array',
  templateUrl: './edit-military-rank-details-form-array.component.html',
  styleUrls: ['./edit-military-rank-details-form-array.component.scss']
})
export class EditMilitaryRankDetailsFormArrayComponent {
  @Input() subForm!: FormGroup;
  @Input() ranks!: MilitaryRankShortDTO[];
  @Input() rankDetails!: MilitaryRankDetailsDTO[];

  formArrayController!: FormArrayController<FormGroup>;

  constructor(private dateFormatService: DateFormatService) {
  }

  ngOnInit() {
    if (this.formArrayController) {
      this.formArrayController.reset();
    }

    this.formArrayController = new FormArrayController(
      this.subForm,
      'militaryRankDetailsArray',
      () => new FormGroup({
        dateOfAssigment: new FormControl(),
        rank: new FormControl(null, [
          Validators.required
        ]),
      })
    );

    this.patchValues(this.rankDetails);
  }

  patchValues(details: MilitaryRankDetailsDTO[]) {
    for (let detail of details) {
      this.formArrayController.addControl(
        this.dtoToSubform(detail)
      );
    }
  }

  dtoToSubform(detail: MilitaryRankDetailsDTO): FormGroup {
    return new FormGroup({
      dateOfAssigment: new FormControl(this.dateFormatService.transform(detail.dateOfAssignment)),
      rank: new FormControl(detail.rank.id, [
        Validators.required
      ]),
    })
  }
}
