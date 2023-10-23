import {Component, inject} from '@angular/core';
import {EditForm} from "../../shared/upload-forms/edit-form";
import {MedalsService} from "../../../shared/services/medals.service";
import {MedalUploadDTO} from "../../../shared/interfaces/medals/medal-upload.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MedalDTO} from "../../../shared/interfaces/medals/medal.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-medal-page',
  templateUrl: './edit-medal-page.component.html',
  styleUrls: ['./edit-medal-page.component.scss']
})
export class EditMedalPageComponent extends EditForm<MedalDTO, MedalUploadDTO, MedalsService> {

  constructor() {
    super();
  }

  getService(): MedalsService {
    return inject(MedalsService);
  }

  getActivatedRoute(): ActivatedRoute {
    return inject(ActivatedRoute);
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
