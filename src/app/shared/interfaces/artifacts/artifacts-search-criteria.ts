import {ArtifactType} from "../../enums/artifact-type";
import {ValueCategory} from "../../enums/value-category";

export interface ArtifactsSearchCriteria {
  title?: string | null;
  artifactType?: ArtifactType | null;
  valueCategory?: ValueCategory | null;
}
