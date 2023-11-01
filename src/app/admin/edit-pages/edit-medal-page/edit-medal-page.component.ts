import {Component, inject, ViewChild} from '@angular/core';
import {MedalsService} from "../../../shared/services/medals.service";
import {MedalUploadDTO} from "../../../shared/interfaces/medals/medal-upload.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MedalDTO} from "../../../shared/interfaces/medals/medal.dto";
import {ActivatedRoute} from "@angular/router";
import {OneFileEntityEditForm} from "../../shared/upload-forms/edit-forms/one-file-entity-edit-form";
import {FileAttachmentDTO} from "../../../shared/interfaces/file-attachments/file-attachment.dto";
import {
  OneFileEntityImageEditorComponent
} from "../one-file-entity-image-editor/one-file-entity-image-editor.component";

@Component({
  selector: 'app-edit-medal-page',
  templateUrl: './edit-medal-page.component.html',
  styleUrls: ['./edit-medal-page.component.scss']
})
export class EditMedalPageComponent extends OneFileEntityEditForm<MedalDTO, MedalUploadDTO, MedalsService> {

  @ViewChild(OneFileEntityImageEditorComponent)
  previewChanger!: OneFileEntityImageEditorComponent;

  entityCode = 'medals';

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
    });
  }

  extractPreview(existingEntity: MedalDTO): FileAttachmentDTO {
    return existingEntity.image;
  }
}
