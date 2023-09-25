import {FileAttachmentDTO} from "../file-attachments/file-attachment.dto";

export interface MedalDTO {
  id: number;
  title: string;
  description: string;
  image: FileAttachmentDTO;
}
