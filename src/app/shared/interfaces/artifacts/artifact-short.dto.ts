import {ValueCategory} from "../../enums/value-category";
import {FileAttachmentDTO} from "../file-attachments/file-attachment.dto";
import {ArtifactType} from "../../enums/artifact-type";

export interface ArtifactShortDTO {
  id: number
  title: string;
  preview : FileAttachmentDTO;
  category: ValueCategory;
  type: ArtifactType;
}
