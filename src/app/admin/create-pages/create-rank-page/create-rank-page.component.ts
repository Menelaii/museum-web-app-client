import {Component, inject} from '@angular/core';
import {MilitaryRanksService} from "../../../shared/services/military-ranks.service";
import {MilitaryRankUploadDTO} from "../../../shared/interfaces/military-ranks/military-rank-upload.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OneFileUploadForm} from "../../shared/upload-forms/one-file-upload-form";

@Component({
  selector: 'app-create-rank-page',
  templateUrl: './create-rank-page.component.html',
  styleUrls: ['./create-rank-page.component.scss']
})
export class CreateRankPageComponent extends OneFileUploadForm<MilitaryRanksService, MilitaryRankUploadDTO> {
  getService(): MilitaryRanksService {
    return inject(MilitaryRanksService);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      image: new FormControl('', [
        Validators.required,
      ])
    });
  }

  formValuesToUploadDTO(): MilitaryRankUploadDTO {
    return {
      title: this.form.value.title
    };
  }
}
