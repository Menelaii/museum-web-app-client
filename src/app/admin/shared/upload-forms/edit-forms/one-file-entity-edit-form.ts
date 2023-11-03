import {EditForm} from "./edit-form";
import {Editor} from "../../../../shared/interfaces/service/editor";
import {OneFileEntityImageEditorComponent} from "../../../edit-pages/one-file-entity-image-editor/one-file-entity-image-editor.component";
import {FileAttachmentDTO} from "../../../../shared/interfaces/file-attachments/file-attachment.dto";

export abstract class OneFileEntityEditForm<E, U, S extends Editor<E, U>> extends EditForm<E, U, S> {

  abstract entityCode: string;
  abstract previewChanger: OneFileEntityImageEditorComponent;

  isPreviewChangerCollapsed = true;

  onPreviewChangerCollapseClick() {
    this.isPreviewChangerCollapsed = !this.isPreviewChangerCollapsed;
    if (!this.isPreviewChangerCollapsed) {
      this.initializePreviewChanger();
    }
  }

  // todo init preview changer and collapse false
  onPreviewChanged = () => {
    this.fetch();
    this.isPreviewChangerCollapsed = true;
  }

  initializePreviewChanger() {
    this.previewChanger.init(
      this.entityId,
      this.entityCode,
      this.extractPreview(this.existingEntity),
      this.onPreviewChanged
    )
  }

  abstract extractPreview(existingEntity: E): FileAttachmentDTO;
}
