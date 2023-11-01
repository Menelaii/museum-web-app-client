import {UploadForm} from "../upload-form";
import {Observable} from "rxjs";
import {CreatorWithOneFile} from "../../../../shared/interfaces/service/creator-with-one-file";
import {HttpResponse} from "@angular/common/http";

export abstract class OneFileEntityUploadForm<S extends CreatorWithOneFile<U>, U> extends UploadForm<S, U> {
  selectedFile: File | null = null;

  constructor() {
    super();
  }

  onFileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }

  submit(): Observable<HttpResponse<any>> {
    if (!this.selectedFile) {
      throw new Error('Illegal state: File Not Found.');
    }

    const uploadDTO = this.formValuesToUploadDTO();
    const image: File = this.selectedFile;

    return this.service.create(uploadDTO, image);
  }

  override onComplete() {
    super.onComplete();
    this.selectedFile = null;
  }
}
