import {Component, inject, ViewChild} from '@angular/core';
import {EnumTranslatorService} from "../../../shared/services/enum-translator.service";
import {ArtifactsService} from "../../../shared/services/artifacts.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArtifactUploadDTO} from "../../../shared/interfaces/artifacts/artifact-upload.dto";
import {MultipleFilesEntityEditForm} from "../../shared/upload-forms/edit-forms/multiple-files-entity-edit-form";
import {ArtifactDTO} from "../../../shared/interfaces/artifacts/artifact.dto";
import {FileAttachmentDTO} from "../../../shared/interfaces/file-attachments/file-attachment.dto";
import {ActivatedRoute} from "@angular/router";
import {
  MultipleFilesEntityImageEditorComponent
} from "../multiple-files-entity-image-editor/multiple-files-entity-image-editor.component";

@Component({
  selector: 'app-edit-artifact-page',
  templateUrl: './edit-artifact-page.component.html',
  styleUrls: ['./edit-artifact-page.component.scss']
})
export class EditArtifactPageComponent extends MultipleFilesEntityEditForm<ArtifactDTO, ArtifactUploadDTO, ArtifactsService>{
  @ViewChild(MultipleFilesEntityImageEditorComponent)
  imageEditor!: MultipleFilesEntityImageEditorComponent;

  entityCode = 'artifacts';

  constructor(public enumTranslator: EnumTranslatorService) {
    super();
  }

  getActivatedRoute(): ActivatedRoute {
    return inject(ActivatedRoute);
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

  //todo ImageAttachmentDTO
  extractImages(entity: ArtifactDTO): FileAttachmentDTO[] {
    return entity.images;
  }
}
