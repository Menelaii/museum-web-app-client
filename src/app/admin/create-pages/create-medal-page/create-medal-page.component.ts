import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MedalsService} from "../../../shared/services/medals.service";
import {MedalUploadDTO} from "../../../shared/interfaces/medals/medal-upload.dto";
import {OneFileEntityUploadForm} from "../../shared/upload-forms/create-forms/one-file-entity-upload-form";

@Component({
  selector: 'app-create-medal-page',
  templateUrl: './create-medal-page.component.html',
  styleUrls: ['./create-medal-page.component.scss']
})
export class CreateMedalPageComponent extends OneFileEntityUploadForm<MedalsService, MedalUploadDTO> {
  getService(): MedalsService {
    return inject(MedalsService);
  }

  formValuesToUploadDTO(): MedalUploadDTO {
    return {
      title: this.form.value.title,
      description: this.form.value.description
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null),
      image: new FormControl('', [
        Validators.required,
      ])
    });
  }
}
