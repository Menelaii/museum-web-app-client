import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {BiographyDTO} from "../interfaces/biographies/biography.dto";
import {environment} from "../../../environments/environment.dev";
import {BiographyUploadDTO} from "../interfaces/biographies/biography-upload.dto";
import {BiographyShortDTO} from "../interfaces/biographies/biography-short.dto";
import {XPage} from "../interfaces/pagination/x-page";
import {BiographiesSearchCriteria} from "../interfaces/biographies/biographies-search-criteria";
import {PageDTO} from "../interfaces/pagination/page.dto";
import {MultipleFilesEntityService} from "../interfaces/service/multiple-files-entity-service";

@Injectable()
export class BiographiesService implements MultipleFilesEntityService<BiographyDTO, BiographyUploadDTO> {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAllWithFilters(page: XPage, searchCriteria: BiographiesSearchCriteria): Observable<PageDTO<BiographyShortDTO>> {
    const queryParams: any = { ...page };

    if (searchCriteria.surname) {
      queryParams.surname = searchCriteria.surname;
    }

    if (searchCriteria.name) {
      queryParams.name = searchCriteria.name;
    }

    if (searchCriteria.patronymic) {
      queryParams.patronymic = searchCriteria.patronymic;
    }

    if (searchCriteria.dateOfBirth) {
      queryParams.dateOfBirth = searchCriteria.dateOfBirth;
    }

    if (searchCriteria.dateOfDeath) {
      queryParams.dateOfDeath = searchCriteria.dateOfDeath;
    }

    if (searchCriteria.placeOfBirth) {
      queryParams.placeOfBirth = searchCriteria.placeOfBirth;
    }

    if (searchCriteria.placeOfDeath) {
      queryParams.placeOfDeath = searchCriteria.placeOfDeath;
    }

    if (searchCriteria.militaryRank) {
      queryParams.militaryRank = searchCriteria.militaryRank;
    }

    if (searchCriteria.medal) {
      queryParams.medal = searchCriteria.medal;
    }

    if (searchCriteria.placeOfService) {
      queryParams.placeOfService = searchCriteria.placeOfService;
    }

    if (searchCriteria.placeOfEmployment) {
      queryParams.placeOfEmployment = searchCriteria.placeOfEmployment;
    }

    return this.http.get<PageDTO<BiographyShortDTO>>(environment.BIOGRAPHIES_URL, {
      params: queryParams
    });
  }

  getById(id: number): Observable<BiographyDTO> {
    return this.http.get<BiographyDTO>(`${environment.BIOGRAPHIES_URL}/${id}`);
  }

  create(biographyUploadDTO: BiographyUploadDTO,
         images: File[] | null,
         preview: File,
         options: {presentation?: File | null} = {}
  ): Observable<HttpResponse<any>> {
    const formData = new FormData();

    formData.append('biography', new Blob([JSON.stringify(biographyUploadDTO)], {
      type: 'application/json'
    }));

    formData.append('preview', preview, preview.name);

    if (images) {
      images.forEach((image) => {
        formData.append('images', image, image.name);
      });
    }

    if (options.presentation) {
      formData.append('presentation', options.presentation, options.presentation.name);
    }

    return this.http.post<HttpResponse<any>>(environment.BIOGRAPHIES_URL, formData, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${environment.BIOGRAPHIES_URL}/${id}`, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response',
    });
  }

  edit(id: number, uploadDTO: BiographyUploadDTO): Observable<HttpResponse<any>> {
    return this.http.patch(
      `${environment.BIOGRAPHIES_URL}/${id}`,
      uploadDTO,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  addImage(id: number, image: File, isPreview: boolean): Observable<HttpResponse<any>> {
    return this.http.post(
      `${environment.BIOGRAPHIES_URL}/${id}/images?isPreview=${isPreview}`,
      image,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response'
      }
    );
  }

  editPresentation(id: number, presentation: File): Observable<HttpResponse<any>> {
    return this.http.patch(
      `${environment.BIOGRAPHIES_URL}/${id}/presentation`,
      presentation,
      {
        headers: this.tokenStorageService.getAuthHeader(),
        observe: 'response',
      }
    );
  }
}
