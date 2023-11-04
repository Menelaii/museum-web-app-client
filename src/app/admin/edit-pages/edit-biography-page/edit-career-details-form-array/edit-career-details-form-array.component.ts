import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormArrayController} from "../../../shared/form-array-controller";
import {CareerDetailsDTO} from "../../../../shared/interfaces/details/career-details.dto";
import {DateFormatService} from "../../../shared/services/date-format.service";

@Component({
  selector: 'app-edit-career-details-form-array',
  templateUrl: './edit-career-details-form-array.component.html',
  styleUrls: ['./edit-career-details-form-array.component.scss']
})
export class EditCareerDetailsFormArrayComponent implements OnInit {
  @Input() subForm!: FormGroup;
  @Input() label!: string;
  @Input() careerDetails!: CareerDetailsDTO[];

  formArrayController!: FormArrayController<FormGroup>;

  constructor(private dateFormatService: DateFormatService) {
  }

  ngOnInit() {
    if (this.formArrayController) {
      this.formArrayController.reset();
    }

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

    this.patchValues(this.careerDetails);
  }

  patchValues(details: CareerDetailsDTO[]) {
    for (let detail of details) {
      this.formArrayController.addControl(
        this.dtoToSubform(detail)
      );
    }
  }

  dtoToSubform(e: CareerDetailsDTO): FormGroup {
    return new FormGroup({
      placeOfService: new FormControl(e.placeOfService, [
        Validators.required
      ]),
      position: new FormControl(e.position, [
        Validators.required
      ]),
      startDate: new FormControl(
        this.dateFormatService.transform(e.startDate)
      ),
      endDate: new FormControl(
        this.dateFormatService.transform(e.endDate)
      ),
    })
  }
}
