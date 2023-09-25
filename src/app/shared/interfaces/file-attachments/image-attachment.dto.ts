import {FileAttachmentDTO} from "./file-attachment.dto";

export interface ImageAttachmentDTO extends FileAttachmentDTO {
  isPreview: boolean;
}
