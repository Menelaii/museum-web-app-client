import {Component, inject, ViewChild} from '@angular/core';
import {MilitaryRanksService} from "../../../shared/services/military-ranks.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MilitaryRankUploadDTO} from "../../../shared/interfaces/military-ranks/military-rank-upload.dto";
import {MilitaryRankDTO} from "../../../shared/interfaces/military-ranks/military-rank.dto";
import {ActivatedRoute} from "@angular/router";
import {OneFileEntityEditForm} from "../../shared/upload-forms/edit-forms/one-file-entity-edit-form";
import {FileAttachmentDTO} from "../../../shared/interfaces/file-attachments/file-attachment.dto";
import {
  OneFileEntityImageEditorComponent
} from "../one-file-entity-image-editor/one-file-entity-image-editor.component";

@Component({
  selector: 'app-edit-rank-page',
  templateUrl: './edit-rank-page.component.html',
  styleUrls: ['./edit-rank-page.component.scss']
})
export class EditRankPageComponent
    extends OneFileEntityEditForm<MilitaryRankDTO, MilitaryRankUploadDTO, MilitaryRanksService>
{

  @ViewChild(OneFileEntityImageEditorComponent)
  previewChanger!: OneFileEntityImageEditorComponent;

  entityCode = 'ranks';

  getService(): MilitaryRanksService {
    return inject(MilitaryRanksService);
  }

  getActivatedRoute(): ActivatedRoute {
    return inject(ActivatedRoute);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  formValuesToUploadDTO(): MilitaryRankUploadDTO {
    return {
      title: this.form.value.title
    };
  }

  extractPreview(existingEntity: MilitaryRankDTO): FileAttachmentDTO {
    return existingEntity.image;
  }
}
