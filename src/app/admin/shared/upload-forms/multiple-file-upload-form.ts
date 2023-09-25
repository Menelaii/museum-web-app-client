import {UploadForm} from "./upload-form";
import {FormControl} from "@angular/forms";
import {FormArrayController} from "../form-array-controller";

export abstract class MultipleFileUploadForm<S, U> extends UploadForm<any, any>{
  selectedFiles: File[] | null = null;
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

  imageControls(): FormControl[] {
    return this.formArrayController.getControls();
  }

  addControl() {
    this.formArrayController.addControl();
  }

  removeLastControl() {
    this.formArrayController.removeLastControl();
  }
}
