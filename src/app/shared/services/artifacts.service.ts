import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {ArtifactDTO} from "../interfaces/artifacts/artifact.dto";
import {environment} from "../../../environments/environment.dev";
import {ArtifactUploadDTO} from "../interfaces/artifacts/artifact-upload.dto";
import {XPage} from "../interfaces/pagination/x-page";
import {ArtifactsSearchCriteria} from "../interfaces/artifacts/artifacts-search-criteria";
import {PageDTO} from "../interfaces/pagination/page.dto";
import {ArtifactShortDTO} from "../interfaces/artifacts/artifact-short.dto";

@Injectable()
export class ArtifactsService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAll(): Observable<ArtifactDTO[]> {
    return this.http.get<ArtifactDTO[]>(environment.ARTIFACTS_URL);
  }

  getAllWithFilters(page: XPage, searchCriteria: ArtifactsSearchCriteria): Observable<PageDTO<ArtifactShortDTO>> {
    const queryParams: any = { ...page }

    if (searchCriteria.title !== null) {
      queryParams.title = searchCriteria.title;
    }

    if (searchCriteria.artifactType !== null) {
      queryParams.artifactType = searchCriteria.artifactType;
    }

    if (searchCriteria.valueCategory !== null) {
      queryParams.valueCategory = searchCriteria.valueCategory;
    }

    return this.http.get<PageDTO<ArtifactShortDTO>>(environment.ARTIFACTS_URL, {
      params: queryParams
    });
  }

  create(artifactUploadDTO: ArtifactUploadDTO, images: File[] | null, preview: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('artifact', new Blob([JSON.stringify(artifactUploadDTO)], {
      type: 'application/json'
    }));
    formData.append('preview', preview, preview.name);

    if (images) {
      images.forEach((image) => {
        formData.append('images', image, image.name);
      });
    }

    return this.http.post<HttpResponse<any>>(environment.ARTIFACTS_URL, formData, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${environment.ARTIFACTS_URL}/${id}`, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response',
    });
  }

  getById(id: number): Observable<ArtifactDTO> {
    return this.http.get<ArtifactDTO>(`${environment.ARTIFACTS_URL}/${id}`);
  }
}
