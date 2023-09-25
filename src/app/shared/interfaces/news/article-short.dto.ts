import {FileAttachmentDTO} from "../file-attachments/file-attachment.dto";

export interface ArticleShortDTO {
  id: number;
  title: string;
  preview: FileAttachmentDTO;
  publishDate: Date;
}
