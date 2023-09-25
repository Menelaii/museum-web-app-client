import {ArtifactType} from "../../enums/artifact-type";
import {ValueCategory} from "../../enums/value-category";

export interface ArtifactUploadDTO {
  title: string;
  creationPeriod: Date;
  type: ArtifactType;
  valueCategory: ValueCategory;
}
