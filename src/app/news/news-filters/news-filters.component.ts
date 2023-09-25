import {Component, OnInit} from '@angular/core';
import {Months} from "../../shared/enums/months";
import {monthTranslations} from "../../shared/enums/months-translations";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-news-filters',
  templateUrl: './news-filters.component.html',
  styleUrls: ['./news-filters.component.scss']
})
export class NewsFiltersComponent implements OnInit {
  initialYear = 2023;
  currentYear = new Date().getFullYear();
  years: number[] = []

  selectedMonth = 0;
  selectedYear = this.currentYear;

  months = Object.values(Months)
    .filter((value) => typeof value === 'number')
    .map((value) => ({
      value: value as number,
      translation: monthTranslations[value as Months]
    }));

  symbolScale = 3;

  selectStyles = {
    fontFamily: 'Open-Sans, sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    fontStyle: 'normal',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    background: 'none',
    border: 'none',
    paddingRight: '10px',
    width: '100%',
    display: 'block',
    height: '100%',
    textTransform: 'uppercase',
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    for (let year = this.initialYear; year <= this.currentYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.selectedYear = params['year'] ?? this.selectedYear;
    this.selectedMonth = params['month'] ?? this.selectedMonth;
    this.resizeSelect();
  }

  onMonthChange() {
    this.resizeSelect();
    this.setParams();
  }

  onYearChange() {
    this.setParams();
  }

  setParams(year: number = this.selectedYear, month: Months = this.selectedMonth) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          year: year,
          month: this.getValueOrDefault(month),
          page: 1
        },
        queryParamsHandling: 'merge'
      });
  }

  getValueOrDefault(value: Months | null) {
    return (value === null || value as number == 0) ? null : value;
  }

  getWidthOfString(text: string, styles: any): number {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      Object.assign(ctx.canvas.style, styles);
      const measurement = ctx.measureText(text);
      return measurement.width;
    }

    return 0;
  }

  resizeSelect(width: number | undefined = undefined) {
    const selectedOption = document.querySelector(
      '.news-filters__select-wrapper select option:checked'
    ) as HTMLOptionElement;

    const select = document.querySelector(
      '.news-filters__select-wrapper select'
    ) as HTMLSelectElement;

    if (selectedOption) {
      select.style.width = `${(this.getWidthOfString(selectedOption.label, this.selectStyles)) * this.symbolScale}px`;
    } else if (width) {
      select.style.width = `${width * this.symbolScale}px`;
    }
  }
}
