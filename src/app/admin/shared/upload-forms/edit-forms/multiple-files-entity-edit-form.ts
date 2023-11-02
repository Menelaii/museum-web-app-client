import {Editor} from "../../../../shared/interfaces/service/editor";
import {EditForm} from "./edit-form";
import {FileAttachmentDTO} from "../../../../shared/interfaces/file-attachments/file-attachment.dto";
import {
  MultipleFilesEntityImageEditorComponent
} from "../../../edit-pages/multiple-files-entity-image-editor/multiple-files-entity-image-editor.component";
import {ImageAttachmentDTO} from "../../../../shared/interfaces/file-attachments/image-attachment.dto";

export abstract class MultipleFilesEntityEditForm<E, U, S extends Editor<E, U>> extends EditForm<E, U, S> {
  abstract entityCode: string;
  abstract imageEditor: MultipleFilesEntityImageEditorComponent;

  isImageEditorCollapsed = true;

  //todo default preview return
  onImageEditorCollapseClick() {
    this.isImageEditorCollapsed = !this.isImageEditorCollapsed;
    if (!this.isImageEditorCollapsed) {
      const images = this.extractImages(this.existingEntity);
      const preview
        = images.find(i => i.isPreview);
      this.imageEditor.init(
        this.entityId,
        this.entityCode,
        preview ?? null,
        images,
        this.onChangesSubmitted
      )
    }
  }

  onChangesSubmitted = () => {
    this.fetch();
    this.isImageEditorCollapsed = true;
  }

  abstract extractImages(entity: E): ImageAttachmentDTO[];
}
