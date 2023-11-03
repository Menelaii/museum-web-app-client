import { Component } from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  selectedFile: File | null = null;
  submitted: Subject<{file: File; isPreview: boolean}> = new Subject<{file: File; isPreview: boolean}>();
  isInitialized = false;
  form: FormGroup;

  constructor() {
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
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;

    this.form.patchValue({image: this.selectedFile.name})
  }

  submit() {
    if (!this.isValid()) {
      return;
    }

    // @ts-ignore
    const file: File = this.selectedFile;
    this.submitted.next({
      file: file,
      isPreview: this.form.value.isPreview
    });

    this.reset();
  }

  isValid(): boolean {
    return this.form.valid && this.selectedFile != null;
  }

  reset() {
    this.isInitialized = false;
    this.selectedFile = null;

    if (this.submitted) {
      this.submitted.unsubscribe();
    }

    this.submitted = new Subject<{file: File; isPreview: boolean}>();
  }
}
