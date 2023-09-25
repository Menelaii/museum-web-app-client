import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OptionsService} from "../../shared/services/options.service";
import {BiographyFilterOptionsDTO} from "../../shared/interfaces/biographies/biography-filter-options.dto";
import {Observer, Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {BiographiesSearchCriteria} from "../../shared/interfaces/biographies/biographies-search-criteria";

@Component({
  selector: 'app-biographies-filters',
  templateUrl: './biographies-filters.component.html',
  styleUrls: ['./biographies-filters.component.scss']
})
export class BiographiesFiltersComponent implements OnDestroy {
  private dataSubscription: Subscription;

  isCollapsed = true;
  isLoading = true;
  form: FormGroup;
  submitted = false;
  filterOptions: BiographyFilterOptionsDTO | undefined;

  constructor(private service: OptionsService, private router: Router,
              private route: ActivatedRoute) {
    const params = route.snapshot.queryParams;
    this.form = new FormGroup({
      surname: new FormControl(params['surname'] ?? ''),
      name: new FormControl(params['name'] ?? ''),
      patronymic: new FormControl(params['patronymic'] ?? ''),
      dateOfBirth: new FormControl(params['dateOfBirth'] ?? null),
      dateOfDeath: new FormControl(params['dateOfDeath'] ?? null),
      placeOfBirth: new FormControl(params['placeOfBirth'] ?? ''),
      placeOfDeath: new FormControl(params['placeOfDeath'] ?? ''),
      militaryRank: new FormControl(params['militaryRank'] ?? '0'),
      medal: new FormControl(params['medal'] ?? '0'),
      placeOfService: new FormControl(params['placeOfService'] ?? '0'),
      placeOfEmployment: new FormControl(params['placeOfEmployment'] ?? ''),
    });

    const observer: Observer<BiographyFilterOptionsDTO> = {
      next: (value: BiographyFilterOptionsDTO) => {
        this.filterOptions = value;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
      }
    }

    this.dataSubscription = service.getBiographyFilterOptions().subscribe(observer);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  submit() {
    if (this.submitted || this.form.invalid) {
      return;
    }

    this.submitted = true;

    const formData: BiographiesSearchCriteria = {...this.form.value};

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          surname: this.getValueOrDefault(formData.surname),
          name: this.getValueOrDefault(formData.name),
          patronymic: this.getValueOrDefault(formData.patronymic),
          dateOfBirth: this.getValueOrDefault(formData.dateOfBirth),
          dateOfDeath: this.getValueOrDefault(formData.dateOfDeath),
          placeOfBirth: this.getValueOrDefault(formData.placeOfBirth),
          placeOfDeath: this.getValueOrDefault(formData.placeOfDeath),
          militaryRank: this.getValueOrDefault(formData.militaryRank),
          medal: this.getValueOrDefault(formData.medal),
          placeOfService: this.getValueOrDefault(formData.placeOfService),
          placeOfEmployment: this.getValueOrDefault(formData.placeOfEmployment),
          page: 1
        },
        queryParamsHandling: 'merge'
      }).then(() => this.submitted = false);
  }

  getValueOrDefault(str: string | null) {
    return (!str || str.trim().length == 0 || str === '0') ? null : str;
  }
}
