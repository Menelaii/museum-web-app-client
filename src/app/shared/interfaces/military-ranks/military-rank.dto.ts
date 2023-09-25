import {FileAttachmentDTO} from "../file-attachments/file-attachment.dto";

export interface MilitaryRankDTO {
  id: number;
  title: string;
  image: FileAttachmentDTO;
}
