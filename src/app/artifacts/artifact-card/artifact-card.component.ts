import {Component, Input} from '@angular/core';
import {ArtifactShortDTO} from "../../shared/interfaces/artifacts/artifact-short.dto";
import {artifactTypeTranslations} from "../../shared/enums/artifact-type-translations";
import {valueCategoryTranslations} from "../../shared/enums/value-category-translations";

@Component({
  selector: 'app-artifact-card',
  templateUrl: './artifact-card.component.html',
  styleUrls: ['./artifact-card.component.scss']
})
export class ArtifactCardComponent {
  @Input() artifact!: ArtifactShortDTO;

  typeTranslations = artifactTypeTranslations;
  valueTranslations = valueCategoryTranslations;
}
