import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Months} from "../../shared/enums/months";
import {monthTranslations} from "../../shared/enums/months-translations";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-news-filters',
  templateUrl: './news-filters.component.html',
  styleUrls: ['./news-filters.component.scss']
})
export class NewsFiltersComponent implements OnInit {
  @ViewChild('monthSelect', { static: false }) monthSelectElement!: ElementRef;

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private renderer: Renderer2) {
    for (let year = this.initialYear; year <= this.currentYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.selectedYear = params['year'] ?? this.selectedYear;
    this.selectedMonth = params['month'] ?? this.selectedMonth;
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

  resizeSelect(width: number | undefined = undefined): void {
    const selectedOption = this.monthSelectElement.nativeElement.querySelector('option:checked');
    const select = this.monthSelectElement.nativeElement;
    if (selectedOption) {
      this.renderer.setStyle(select, 'width', `${(this.getWidthOfString(selectedOption.label, this.selectStyles)) * this.symbolScale}px`);
    } else if (width) {
      this.renderer.setStyle(select, 'width', `${width * this.symbolScale}px`);
    }
  }

  getSelectedMonth() {
    let tra = this.months.filter((value) => value.value == this.selectedMonth).at(0);
    return tra ? tra.translation :  '';
  }
}
