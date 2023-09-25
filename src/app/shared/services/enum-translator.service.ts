import {Injectable} from "@angular/core";
import {TranslatedEnum} from "../interfaces/translated-enum";
import {ArtifactType} from "../enums/artifact-type";
import {artifactTypeTranslations} from "../enums/artifact-type-translations";
import {ValueCategory} from "../enums/value-category";
import {valueCategoryTranslations} from "../enums/value-category-translations";

@Injectable()
export class EnumTranslatorService {
  private types: TranslatedEnum[] = Object.values(ArtifactType)
    .filter((value) => typeof value === 'number')
    .map((value) => ({
      value: value as number,
      translation: artifactTypeTranslations[value as ArtifactType]
    }));

  private valueCategories: TranslatedEnum[] = Object.values(ValueCategory)
    .filter((value) => typeof value === 'number')
    .map((value) => ({
      value: value as number,
      translation: valueCategoryTranslations[value as ValueCategory]
    }));

  getTypes(): TranslatedEnum[] {
    return this.types;
  }

  getValueCategories(): TranslatedEnum[] {
    return this.valueCategories;
  }
}
