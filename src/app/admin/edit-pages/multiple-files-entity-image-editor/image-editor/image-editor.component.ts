import {Component} from '@angular/core';
import {Subject} from "rxjs";
import {EditorActions} from "./editor-actions";
import {FileAttachmentDTO} from "../../../../shared/interfaces/file-attachments/file-attachment.dto";
import {ImageAttachmentDTO} from "../../../../shared/interfaces/file-attachments/image-attachment.dto";

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent {
  onDelete: Subject<number> = new Subject<number>();
  onSetAsPreview: Subject<number> = new Subject<number>();
  isInitialized = false;
  selectedAction = EditorActions.UNDEFINED;
  images:ImageAttachmentDTO[] = [];

  init(images: ImageAttachmentDTO[],
       onDelete: (id: number) => void,
       onSetAsPreview: (id: number) => void
  ) {
    this.reset();
    this.images = images;
    this.onDelete.subscribe(onDelete);
    this.onSetAsPreview.subscribe(onSetAsPreview);
    this.isInitialized = true;
  }

  onRadioChanged(action: EditorActions) {
    this.selectedAction = action;
  }

  onImageClick(image: FileAttachmentDTO) {
    if (this.selectedAction === EditorActions.UNDEFINED) {
      return;
    }

    if (this.selectedAction === EditorActions.SET_AS_PREVIEW) {
      this.onSetAsPreview.next(image.id);
    } else {
      this.onDelete.next(image.id);
    }
  }

  reset() {
    this.isInitialized = false;
    this.selectedAction = EditorActions.UNDEFINED;
    this.images = [];

    if (this.onSetAsPreview) {
      this.onSetAsPreview.unsubscribe();
    }
    if (this.onDelete) {
      this.onDelete.unsubscribe();
    }

    this.onSetAsPreview = new Subject<number>();
    this.onDelete = new Subject<number>();
  }

  protected readonly EditorActions = EditorActions;
}
