import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {ArtifactDTO} from "../interfaces/artifacts/artifact.dto";
import {environment} from "../../../environments/environment.dev";
import {XPage} from "../interfaces/pagination/x-page";
import {PageDTO} from "../interfaces/pagination/page.dto";
import {ArticlesSearchCriteria} from "../interfaces/news/articles-search-criteria";
import {ArticleShortDTO} from "../interfaces/news/article-short.dto";
import {ArticleDTO} from "../interfaces/news/article.dto";
import {ArticleUploadDTO} from "../interfaces/news/article-upload.dto";
import {CreatorWithOneFile} from "../interfaces/service/creator-with-one-file";
import {Remover} from "../interfaces/service/remover";
import {OneFileEntityService} from "../interfaces/service/one-file-entity-service";

@Injectable()
export class ArticlesService implements OneFileEntityService<ArticleDTO, ArticleUploadDTO> {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getLatest(page: XPage) {
    const queryParams: any = { ...page };

    return this.http.get<PageDTO<ArticleShortDTO>>(environment.LATEST_ARTICLES_URL, {
      params: queryParams,
    });
  }

  getAllWithFilters(page: XPage, searchCriteria: ArticlesSearchCriteria): Observable<PageDTO<ArticleShortDTO>> {
    const queryParams: any = { ...page };

    if (searchCriteria.year) {
      queryParams.year = searchCriteria.year;
    }

    if (searchCriteria.month) {
      queryParams.month = searchCriteria.month;
    }

    return this.http.get<PageDTO<ArticleShortDTO>>(environment.ARTICLES_URL, {
      params: queryParams,
    });
  }

  create(articleUploadDTO: ArticleUploadDTO, preview: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('article', new Blob([JSON.stringify(articleUploadDTO)], {
      type: 'application/json',
    }));
    formData.append('preview', preview, preview.name);

    return this.http.post<HttpResponse<any>>(environment.ARTICLES_URL, formData, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${environment.ARTICLES_URL}/${id}`, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response',
    });
  }

  getById(id: number): Observable<ArticleDTO> {
    return this.http.get<ArticleDTO>(`${environment.ARTICLES_URL}/${id}`);
  }

  edit(id: number, uploadDTO: ArticleUploadDTO): Observable<HttpResponse<any>> {
    return this.http.patch<HttpResponse<any>>(
      `${environment.ARTICLES_URL}/${id}`,
      uploadDTO,
      { headers: this.tokenStorageService.getAuthHeader(), observe: 'response' }
    );
  }

  changePreview(id: number, preview: File): Observable<HttpResponse<any>> {
    return this.http.patch(
      `${environment.ARTICLES_URL}/${id}/preview`,
      preview,
      { headers: this.tokenStorageService.getAuthHeader(), observe: 'response' }
    );
  }
}
