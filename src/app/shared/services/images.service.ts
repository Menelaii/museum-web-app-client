import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.dev";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class ImagesService {
  multipleFilesEntitiesUrls: Map<string, string> = new Map<string, string>([
    ['artifacts', environment.ARTIFACTS_URL],
    ['biographies', environment.BIOGRAPHIES_URL],
  ]);

  oneFileEntitiesUrls: Map<string, string> = new Map<string, string>([
    ['medals', environment.MEDALS_URL],
    ['ranks', environment.MILITARY_RANKS_URL],
    ['articles', environment.ARTICLES_URL]
  ]);

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}


  saveImageAsPreview(entityCode: string, entityId: number, image: File) {
    this.throwIfInvalidOneFileEntity(entityCode);

    const url = `${this.oneFileEntitiesUrls.get(entityCode)}/${entityId}/preview`;

    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.patch(
      url,
      formData,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  addImage(entityCode: string, entityId: number, image: File, isPreview: boolean) {
    this.throwIfInvalidMultipleFilesEntity(entityCode);

    const url = `${this.multipleFilesEntitiesUrls.get(entityCode)}/${entityId}/images?isPreview=${isPreview}`;

    const formData = new FormData();
    formData.append('image', image, image.name);

    return this.http.post<HttpResponse<any>>(
      url,
      formData,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  setAsPreview(entityCode: string, entityId: number, imageId: number) {
    this.throwIfInvalidMultipleFilesEntity(entityCode);

    const url = `${this.multipleFilesEntitiesUrls.get(entityCode)}/${entityId}/preview?previewId=${imageId}`;

    return this.http.patch(
      url,
      null,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  deleteImage(entityCode: string, entityId: number, imageId: number) {
    this.throwIfInvalidMultipleFilesEntity(entityCode);

    const url = `${this.multipleFilesEntitiesUrls.get(entityCode)}/${entityId}/images/${imageId}`;

    return this.http.delete(
      url,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  private throwIfInvalidOneFileEntity(entityCode: string) {
    if (!this.oneFileEntitiesUrls.has(entityCode)) {
      throw new Error('Invalid entity code');
    }
  }

  private throwIfInvalidMultipleFilesEntity(entityCode: string) {
    if (!this.multipleFilesEntitiesUrls.has(entityCode)) {
      throw new Error('Invalid entity code');
    }
  }
}
