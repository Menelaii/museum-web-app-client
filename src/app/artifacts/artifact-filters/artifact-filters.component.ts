import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OptionsService} from "../../shared/services/options.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtifactsSearchCriteria} from "../../shared/interfaces/artifacts/artifacts-search-criteria";
import {ValueCategory} from "../../shared/enums/value-category";
import {ArtifactType} from "../../shared/enums/artifact-type";
import {artifactTypeTranslations} from "../../shared/enums/artifact-type-translations";
import {valueCategoryTranslations} from "../../shared/enums/value-category-translations";
import {TranslatedEnum} from "../../shared/interfaces/translated-enum";
import {EnumTranslatorService} from "../../shared/services/enum-translator.service";

@Component({
  selector: 'app-artifact-filters',
  templateUrl: './artifact-filters.component.html',
  styleUrls: ['./artifact-filters.component.scss']
})
export class ArtifactFiltersComponent {
  isCollapsed = true;
  form: FormGroup;
  submitted = false;

  constructor(private service: OptionsService, private router: Router,
              private route: ActivatedRoute, public enumTranslator: EnumTranslatorService) {
    const params = route.snapshot.queryParams;
    this.form = new FormGroup({
      title: new FormControl(params['title'] ?? ''),
      valueCategory: new FormControl(params['valueCategory'] ?? 0),
      artifactType: new FormControl(params['artifactType'] ?? 0),
    });
  }

  submit() {
    if (this.submitted || this.form.invalid) {
      return;
    }

    this.submitted = true;

    const formData: ArtifactsSearchCriteria = {...this.form.value};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          title: this.getValueOrDefault(formData.title),
          artifactType: this.getEnumValueOrDefault(formData.artifactType),
          valueCategory: this.getEnumValueOrDefault(formData.valueCategory),
          page: 1
        },
        queryParamsHandling: 'merge'
      }).then(() => this.submitted = false);
  }

  getValueOrDefault(str: string | null | undefined) {
    return (!str || str.trim().length == 0 || str === '0') ? null : str;
  }

  getEnumValueOrDefault(value: ValueCategory | ArtifactType | null | undefined) {
    return (!value || value as number == 0) ? null : value;
  }
}
