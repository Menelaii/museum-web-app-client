import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
import {Creator} from "../interfaces/creator";

@Injectable()
export class ArticlesService implements Creator<ArticleUploadDTO> {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAll(): Observable<ArtifactDTO[]> {
    return this.http.get<ArtifactDTO[]>(environment.ARTIFACTS_URL);
  }

  getLatest(page: XPage) {
    const queryParams: any = { ...page };

    return this.http.get<PageDTO<ArticleShortDTO>>(environment.LATEST_ARTICLES_URL, {
      params: queryParams,
    });
  }

  getAllWithFilters(page: XPage, searchCriteria: ArticlesSearchCriteria): Observable<PageDTO<ArticleShortDTO>> {
    const queryParams: any = { ...page };

    if (searchCriteria.year !== null) {
      queryParams.year = searchCriteria.year;
    }

    if (searchCriteria.month !== null) {
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
}
