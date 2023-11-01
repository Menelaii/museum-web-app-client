import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {ArtifactDTO} from "../interfaces/artifacts/artifact.dto";
import {environment} from "../../../environments/environment.dev";
import {ArtifactUploadDTO} from "../interfaces/artifacts/artifact-upload.dto";
import {XPage} from "../interfaces/pagination/x-page";
import {ArtifactsSearchCriteria} from "../interfaces/artifacts/artifacts-search-criteria";
import {PageDTO} from "../interfaces/pagination/page.dto";
import {ArtifactShortDTO} from "../interfaces/artifacts/artifact-short.dto";
import {MultipleFilesEntityService} from "../interfaces/service/multiple-files-entity-service";

@Injectable()
export class ArtifactsService implements MultipleFilesEntityService<ArtifactDTO, ArtifactUploadDTO> {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAll(): Observable<ArtifactDTO[]> {
    return this.http.get<ArtifactDTO[]>(environment.ARTIFACTS_URL);
  }

  getAllWithFilters(page: XPage, searchCriteria: ArtifactsSearchCriteria): Observable<PageDTO<ArtifactShortDTO>> {
    const queryParams: any = { ...page }

    if (searchCriteria.title) {
      queryParams.title = searchCriteria.title;
    }

    if (searchCriteria.artifactType) {
      queryParams.artifactType = searchCriteria.artifactType;
    }

    if (searchCriteria.valueCategory) {
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

  deleteImage(artifactId: number, imageId: number): Observable<HttpResponse<any>> {
    return this.http.delete(
      `${environment.ARTIFACTS_URL}/${artifactId}/images/${imageId}`,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  edit(id: number, uploadDTO: ArtifactUploadDTO): Observable<HttpResponse<any>> {
    return this.http.patch(
      `${environment.ARTIFACTS_URL}/${id}`,
      uploadDTO,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  addImage(id: number, image: File, isPreview: boolean): Observable<HttpResponse<any>> {
    return this.http.post(
      `${environment.ARTIFACTS_URL}/${id}/images?isPreview=${isPreview}`,
      image,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }
}
