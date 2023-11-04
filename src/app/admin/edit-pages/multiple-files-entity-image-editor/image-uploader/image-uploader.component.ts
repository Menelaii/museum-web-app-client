import { Component } from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileInputHandler} from "../../../shared/file-input-handler";
import transformJavaScript
  from "@angular-devkit/build-angular/src/builders/browser-esbuild/javascript-transformer-worker";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  submitted: Subject<{file: File; isPreview: boolean}> = new Subject<{file: File; isPreview: boolean}>();
  isInitialized = false;
  form: FormGroup;
  fileInputHandler: FileInputHandler;

  constructor() {
    this.fileInputHandler = new FileInputHandler();

    this.form = new FormGroup({
      isPreview: new FormControl(false),
      image: new FormControl('', [
        Validators.required
      ])
    });
  }

  init(onSubmit: (data: {file: File; isPreview: boolean}) => void) {
    this.reset();

    this.submitted.subscribe(onSubmit);

    this.isInitialized = true;
  }

  onFileChanged($event: Event) {
    this.fileInputHandler.onFileChanged($event);
    this.form.patchValue({image: this.fileInputHandler.getSelectedFileName()})
  }

  submit() {
    if (!this.isValid()) {
      return;
    }

    // @ts-ignore
    const file: File = this.fileInputHandler.selectedFile;
    this.submitted.next({
      file: file,
      isPreview: this.form.value.isPreview
    });

    this.reset();
  }

  isValid(): boolean {
    return this.form.valid && this.fileInputHandler.isPresent();
  }

  reset() {
    this.isInitialized = false;
    this.fileInputHandler.reset();

    if (this.submitted) {
      this.submitted.unsubscribe();
    }

    this.submitted = new Subject<{file: File; isPreview: boolean}>();
  }
}
