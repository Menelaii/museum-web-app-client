import {Component, inject} from '@angular/core';
import {EnumTranslatorService} from "../../../shared/services/enum-translator.service";
import {ArtifactsService} from "../../../shared/services/artifacts.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtifactUploadDTO} from "../../../shared/interfaces/artifacts/artifact-upload.dto";
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MultipleFilesEntityUploadForm} from "../../shared/upload-forms/create-forms/multiple-files-entity-upload-form";

@Component({
  selector: 'app-create-artifact-page',
  templateUrl: './create-artifact-page.component.html',
  styleUrls: ['./create-artifact-page.component.scss']
})
export class CreateArtifactPageComponent extends MultipleFilesEntityUploadForm<ArtifactsService, ArtifactUploadDTO> {
  constructor(public enumTranslator: EnumTranslatorService) {
    super();
  }

  getService(): ArtifactsService {
    return inject(ArtifactsService);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      creationPeriod: new FormControl(null),
      valueCategory: new FormControl(0, [
        Validators.required
      ]),
      artifactType: new FormControl(0, [
        Validators.required
      ]),
      preview: new FormControl('', [
        Validators.required
      ]),
      images: new FormArray([
        new FormControl('')
      ])
    });
  }

  formValuesToUploadDTO(): ArtifactUploadDTO {
    return {
      title: this.form.value.title,
      creationPeriod: this.form.value.creationPeriod,
      type: this.form.value.artifactType,
      valueCategory: this.form.value.valueCategory
    };
  }

  submit(): Observable<HttpResponse<any>> {
    if (!this.selectedFile) {
      throw new Error('Illegal State: File Not Found');
    }

    const formData: ArtifactUploadDTO = this.formValuesToUploadDTO();

    const images: File[] | null = this.selectedFiles;
    const preview: File = this.selectedFile;

    return this.service.create(formData, images, preview);
  }
}
