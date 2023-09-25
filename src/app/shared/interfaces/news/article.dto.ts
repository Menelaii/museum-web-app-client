import {ArticleShortDTO} from "./article-short.dto";

export interface ArticleDTO extends ArticleShortDTO {
  content: string;
}
