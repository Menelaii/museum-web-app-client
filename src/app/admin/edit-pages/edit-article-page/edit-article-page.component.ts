import {Component, inject, ViewChild} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleUploadDTO} from "../../../shared/interfaces/news/article-upload.dto";
import {OneFileEntityEditForm} from "../../shared/upload-forms/edit-forms/one-file-entity-edit-form";
import {ArticleDTO} from "../../../shared/interfaces/news/article.dto";
import {FileAttachmentDTO} from "../../../shared/interfaces/file-attachments/file-attachment.dto";
import {ActivatedRoute} from "@angular/router";
import {
  OneFileEntityImageEditorComponent
} from "../one-file-entity-image-editor/one-file-entity-image-editor.component";

@Component({
  selector: 'app-edit-article-page',
  templateUrl: './edit-article-page.component.html',
  styleUrls: ['./edit-article-page.component.scss']
})
export class EditArticlePageComponent extends OneFileEntityEditForm<ArticleDTO, ArticleUploadDTO, ArticlesService> {
  @ViewChild(OneFileEntityImageEditorComponent)
  previewChanger!: OneFileEntityImageEditorComponent;

  entityCode = 'articles';

  getService(): ArticlesService {
    return inject(ArticlesService);
  }

  getActivatedRoute(): ActivatedRoute {
    return inject(ActivatedRoute);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      content: new FormControl(null, [
        Validators.required,
      ])
    });
  }

  formValuesToUploadDTO(): ArticleUploadDTO {
    return {
      title: this.form.value.title,
      content: this.form.value.content
    }
  }

  extractPreview(existingEntity: ArticleDTO): FileAttachmentDTO {
    return existingEntity.preview;
  }
}
