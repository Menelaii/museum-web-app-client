import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FileInputHandler} from "../../../shared/file-input-handler";
import {FileAttachmentDTO} from "../../../../shared/interfaces/file-attachments/file-attachment.dto";
import {BiographiesService} from "../../../../shared/services/biographies.service";

@Component({
  selector: 'app-presentation-editor',
  templateUrl: './presentation-editor.component.html',
  styleUrls: ['./presentation-editor.component.scss']
})
export class PresentationEditorComponent {
  form: FormGroup;
  existingPresentation: FileAttachmentDTO | undefined;
  fileInputHandler : FileInputHandler;
  isInitialized = false;
  isLoading = false;
  entityId:number | null = null;

  constructor(private service: BiographiesService) {
    this.fileInputHandler = new FileInputHandler();

    this.form = new FormGroup({
      presentation: new FormControl('', [
        Validators.required
      ])
    });
  }

  init(entityId: number, presentation: FileAttachmentDTO | undefined) {
    this.reset();
    this.entityId = entityId;
    this.existingPresentation = presentation;
    this.isInitialized = true;
  }

  reset() {
    this.isInitialized = false;
    this.fileInputHandler.reset();
    this.entityId = null;
    this.existingPresentation = undefined;
  }

  onFileChanged($event: Event) {
    this.fileInputHandler.onFileChanged($event);
    this.form.patchValue({presentation: this.fileInputHandler.getSelectedFileName()})
  }

  submit() {
    if (!this.isValid()) {
      return;
    }

    this.isLoading = true;
    // @ts-ignore
    this.service.editPresentation(this.entityId, this.fileInputHandler.selectedFile).subscribe(
      () => {
        this.isLoading = false;
    })

    this.reset();
  }

  isValid(): boolean {
    return this.entityId != null
      && this.form.valid
      && this.fileInputHandler.isPresent();
  }
}
