import {UploadForm} from "./upload-form";
import {Observable} from "rxjs";
import {Creator} from "../../../shared/interfaces/creator";
import {HttpResponse} from "@angular/common/http";

export abstract class OneFileUploadForm<S extends Creator<U>, U> extends UploadForm<S, U> {

  constructor() {
    super();
  }

  create(): Observable<HttpResponse<any>> {
    if (!this.selectedFile) {
      throw new Error('Illegal state: File Not Found.');
    }

    const formData = this.formValuesToUploadDTO();
    const image: File = this.selectedFile;

    return this.service.create(formData, image);
  }
}
