import {Component, OnDestroy} from '@angular/core';
import {ImagesService} from "../../../shared/services/images.service";
import {FileAttachmentDTO} from "../../../shared/interfaces/file-attachments/file-attachment.dto";
import {Subject} from "rxjs";

@Component({
  selector: 'app-one-file-entity-image-editor',
  templateUrl: './one-file-entity-image-editor.component.html',
  styleUrls: ['./one-file-entity-image-editor.component.scss']
})
export class OneFileEntityImageEditorComponent implements OnDestroy {
  selectedFile: File | null = null;
  existingPreview: FileAttachmentDTO | null = null;
  previewChanged: Subject<void> = new Subject<void>();
  entityCode: string | null = null;
  entityId: number | null = null;
  isInitialized = false;
  isLoading = false;

  constructor(private service: ImagesService) {
  }

  init(entityId: number, entityCode: string,
       preview: FileAttachmentDTO, onChanged: () => void
  ) {
    this.reset();

    this.entityId = entityId;
    this.entityCode = entityCode;
    this.existingPreview = preview;

    this.previewChanged.subscribe(onChanged);

    this.isInitialized = true;
  }

  onFileChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedFile = input.files[0] as File;
  }

  changePreview() {
    if (!this.isValid()) {
      return;
    }

    this.isLoading = true;

    // @ts-ignore
    this.service.saveImageAsPreview(this.entityCode, this.entityId, this.selectedFile).subscribe(
      ()=> {
        this.previewChanged.next();
        this.reset();

        this.isLoading = false;
      }
    );
  }

  isValid(): boolean {
    return this.selectedFile != null
      && this.entityId != null
      && this.entityCode != null;
  }

  reset() {
    this.isInitialized = false;
    this.entityId = null;
    this.entityCode = null;
    this.selectedFile = null;
    this.existingPreview = null;

    if (this.previewChanged) {
      this.previewChanged.unsubscribe();
    }

    this.previewChanged = new Subject<void>();
  }

  ngOnDestroy(): void {
    if (this.previewChanged) {
      this.previewChanged.unsubscribe();
    }
  }
}
