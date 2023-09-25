import {Component, OnDestroy, ViewChild} from '@angular/core';
import {CarouselComponent} from "ngx-bootstrap/carousel";
import {ArticleShortDTO} from "../../../shared/interfaces/news/article-short.dto";
import {Router} from "@angular/router";
import {ArticlesService} from "../../../shared/services/articles.service";
import {XPage} from "../../../shared/interfaces/pagination/x-page";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-last-news',
  templateUrl: './last-news.component.html',
  styleUrls: ['./last-news.component.scss']
})
export class LastNewsComponent implements OnDestroy {
  private dataSubscription: Subscription;

  @ViewChild('lastNewsCarousel') carousel!: CarouselComponent;

  content: ArticleShortDTO[] = [];
  chunks: ArticleShortDTO[][] = [[]]
  chunkSize = 3;
  page: XPage = {itemsPerPage: 9, page: 1};

  showIndicators = false;
  interval = 0;
  loading: boolean = true;

  constructor(private router: Router, private service: ArticlesService) {
    this.dataSubscription = this.service.getLatest(this.page).subscribe(value => {
      this.content = value.models;
      this.chunks = this.chunkArray(this.content, this.chunkSize);
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  next() {
    this.carousel.nextSlide();
  }

  prev() {
    this.carousel.previousSlide();
  }

  chunkArray(array: ArticleShortDTO[], chunkSize: number): ArticleShortDTO[][] {
    const result: ArticleShortDTO[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  onCardClick(card: ArticleShortDTO) {
    this.router.navigate(['news', card.id]);
  }
}
