import {UploadForm} from "../upload-form";
import {FormControl} from "@angular/forms";
import {FormArrayController} from "../../form-array-controller";
import {CreatorWithMultipleFiles} from "../../../../shared/interfaces/service/creator-with-multiple-files";

export abstract class MultipleFilesEntityUploadForm<S extends CreatorWithMultipleFiles<U>, U> extends UploadForm<S, U>{
  selectedFiles: File[] | null = null;
  selectedFile: File | null = null;
  formArrayController: FormArrayController<FormControl>;

  protected constructor() {
    super();
    this.formArrayController = new FormArrayController(
      this.form, 'images'
    );
  }

  onFilesChanged($event: Event) {
    const input = ($event.target as HTMLInputElement);
    const files = input?.files;

    if (files && files.length > 0) {
      if (!this.selectedFiles) {
        this.selectedFiles = Array.from(files);
      } else {
        this.selectedFiles.push(files[0]);
      }
    }
  }

  onFileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }

  imageControls(): FormControl[] {
    return this.formArrayController.getControls();
  }

  addControl() {
    this.formArrayController.createControl();
  }

  removeLastControl() {
    this.formArrayController.removeLastControl();
  }

  override onComplete() {
    super.onComplete();
    this.selectedFile = null;
    this.selectedFiles = null;
  }
}
