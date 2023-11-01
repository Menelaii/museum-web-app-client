import {Component, OnDestroy, ViewChild} from '@angular/core';
import {FileAttachmentDTO} from "../../../shared/interfaces/file-attachments/file-attachment.dto";
import {Subject} from "rxjs";
import {ImagesService} from "../../../shared/services/images.service";
import {ImageUploaderComponent} from "./image-uploader/image-uploader.component";
import {ImageEditorComponent} from "./image-editor/image-editor.component";

@Component({
  selector: 'app-multiple-files-entity-image-editor',
  templateUrl: './multiple-files-entity-image-editor.component.html',
  styleUrls: ['./multiple-files-entity-image-editor.component.scss']
})
export class MultipleFilesEntityImageEditorComponent implements OnDestroy {
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  @ViewChild(ImageEditorComponent) imageEditor!: ImageEditorComponent;

  changesSubmitted: Subject<void> = new Subject<void>();

  entityCode: string | null = null;
  entityId: number | null = null;

  isInitialized = false;
  isLoading = false;

  constructor(private service: ImagesService) {
  }

  init(entityId: number,
       entityCode: string,
       images: FileAttachmentDTO[],
       onChangesSubmitted: () => void
  ) {
    this.reset();

    this.entityId = entityId;
    this.entityCode = entityCode;

    this.changesSubmitted.subscribe(onChangesSubmitted);

    this.imageUploader.init(this.onUpload);
    this.imageEditor.init(images, this.onDelete, this.onSetAsPreview);

    this.isInitialized = true;
  }

  onUpload = (data: {file: File, isPreview: boolean}) => {
    // @ts-ignore
    this.service.addImage(this.entityCode, this.entityId, data.file, data.isPreview).subscribe(()=> {
      this.changesSubmitted.next();
    });
  }

  onSetAsPreview = (imageId: number) => {
    // @ts-ignore
    this.service.setAsPreview(this.entityCode, this.entityId, imageId).subscribe(()=> {
      this.changesSubmitted.next();
    });
  }

  onDelete = (imageId: number) => {
    // @ts-ignore
    this.service.deleteImage(this.entityCode, this.entityId, imageId).subscribe(()=> {
      this.changesSubmitted.next();
    });
  }

  reset() {
    this.isInitialized = false;
    this.entityId = null;
    this.entityCode = null;

    this.imageUploader.reset();
    this.imageEditor.reset();

    if (this.changesSubmitted) {
      this.changesSubmitted.unsubscribe();
    }

    this.changesSubmitted = new Subject<void>();
  }

  ngOnDestroy(): void {
    if (this.changesSubmitted) {
      this.changesSubmitted.unsubscribe();
    }
  }
}
