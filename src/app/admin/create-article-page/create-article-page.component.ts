import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ArticleUploadDTO} from "../../shared/interfaces/news/article-upload.dto";
import {ArticlesService} from "../../shared/services/articles.service";
import {OneFileUploadForm} from "../shared/upload-forms/one-file-upload-form";

@Component({
  selector: 'app-create-article-page',
  templateUrl: './create-article-page.component.html',
  styleUrls: ['./create-article-page.component.scss']
})
export class CreateArticlePageComponent extends OneFileUploadForm<ArticlesService, ArticleUploadDTO> {

  getService(): ArticlesService {
    return inject(ArticlesService);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      content: new FormControl(null, [
        Validators.required,
      ]),
      preview: new FormControl(null, [
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
}
