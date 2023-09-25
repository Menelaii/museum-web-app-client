import {FileAttachmentDTO} from "../file-attachments/file-attachment.dto";
import {ValueCategory} from "../../enums/value-category";
import {ArtifactType} from "../../enums/artifact-type";
import {ImageAttachmentDTO} from "../file-attachments/image-attachment.dto";

export interface ArtifactDTO {
  id: number;
  title: string;
  creationPeriod: Date;
  type: ArtifactType;
  valueCategory: ValueCategory;
  images: ImageAttachmentDTO[];
}
