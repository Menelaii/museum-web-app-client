import {FormGroup} from "@angular/forms";
import {Observable, Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export abstract class UploadForm<S, U> {
  error = false;
  isSubmitted = false;
  form: FormGroup;
  service: S;

  protected constructor() {
    this.service = this.getService();
    this.form = this.createFormGroup();
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;

    const observer: Observer<HttpResponse<any>> = {
      complete: () =>  {
        this.onComplete();
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

    this.submit().subscribe(observer);
  }

  onComplete() {
    this.form.reset();
  }

  abstract formValuesToUploadDTO() : U;

  abstract createFormGroup(): FormGroup;

  abstract getService(): S;

  abstract submit(): Observable<HttpResponse<any>>
}
