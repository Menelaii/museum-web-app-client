import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ShortNewsCardComponent} from "./short-news-card/short-news-card.component";
import { NewsPageComponent } from './news-page/news-page.component';
import { NewsArticlePageComponent } from './news-article-page/news-article-page.component';
import {RouterModule} from "@angular/router";
import { NewsFiltersComponent } from './news-filters/news-filters.component';
import {FormsModule} from "@angular/forms";
import {QuillViewHTMLComponent} from "ngx-quill";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: NewsPageComponent},
            {path: ':id', component: NewsArticlePageComponent}
        ]),
        FormsModule,
        QuillViewHTMLComponent,
    ],
  declarations: [
    ShortNewsCardComponent,
    NewsPageComponent,
    NewsArticlePageComponent,
    NewsFiltersComponent
  ],
  exports: [
    ShortNewsCardComponent
  ]
})
export class NewsModule {}
