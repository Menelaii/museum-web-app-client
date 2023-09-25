import {Component, Input} from '@angular/core';
import {ArticleShortDTO} from "../../shared/interfaces/news/article-short.dto";

@Component({
  selector: 'app-short-news-card',
  templateUrl: './short-news-card.component.html',
  styleUrls: ['./short-news-card.component.scss']
})
export class ShortNewsCardComponent {
  @Input() model!: ArticleShortDTO;
}
