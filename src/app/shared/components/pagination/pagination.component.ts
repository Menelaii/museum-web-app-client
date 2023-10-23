import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  private buttonsLimit = 9;

  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 1;
  @Input() totalElements: number = 0;

  pages: number[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.redraw();
  }

  createRange(start: number, end: number): number[] {
    return [...Array(end).keys()].map(el => el + start);
  }

  onPageChanged(page: number) {
    this.currentPage = page;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          page: page,
        },
        queryParamsHandling: 'merge'
      });
  }

  redraw() {
    const pagesCount = Math.ceil(this.totalElements / this.itemsPerPage);
    if (pagesCount <= this.buttonsLimit) {
      this.pages = this.createRange(1, pagesCount);
    } else {
      const initialCenter = Math.ceil(this.buttonsLimit / 2);
      if (this.currentPage > initialCenter) {
        const offset = this.currentPage - initialCenter;
        this.pages = this.createRange(1, this.buttonsLimit);

        for (let i = 0; i < this.pages.length; i++) {
          this.pages[i] += offset;
        }
      } else {
        this.pages = this.createRange(1, this.buttonsLimit);
      }
    }
  }
}
