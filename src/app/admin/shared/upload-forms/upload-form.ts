import {FormGroup} from "@angular/forms";
import {Observable, Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export abstract class UploadForm<S, U> {
  error = false;
  isSubmitted = false;
  form: FormGroup;
  selectedFile: File | null = null;
  service: S;

  protected constructor() {
    this.service = this.getService();
    this.form = this.createFormGroup();
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid || !this.selectedFile) {
      return;
    }

    this.isSubmitted = true;

    const observer: Observer<HttpResponse<any>> = {
      complete: () =>  {
        this.selectedFile = null;
        this.form.reset();
      },
      error: (err: any) => {
        this.error = true;
        this.isSubmitted = false;
      },
      next: (value: HttpResponse<any>) => {
        this.isSubmitted = false;
        this.error = false;
      }
    }

    this.create().subscribe(observer);
  }

  onFileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }

  abstract formValuesToUploadDTO() : U;

  abstract createFormGroup(): FormGroup;

  abstract getService(): S;

  abstract create(): Observable<HttpResponse<any>>
}
