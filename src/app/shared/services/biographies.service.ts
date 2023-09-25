import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {BiographyDTO} from "../interfaces/biographies/biography.dto";
import {environment} from "../../../environments/environment.dev";
import {BiographyUploadDTO} from "../interfaces/biographies/biography-upload.dto";
import {BiographyShortDTO} from "../interfaces/biographies/biography-short.dto";
import {XPage} from "../interfaces/pagination/x-page";
import {BiographiesSearchCriteria} from "../interfaces/biographies/biographies-search-criteria";
import {PageDTO} from "../interfaces/pagination/page.dto";

@Injectable()
export class BiographiesService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAll(): Observable<BiographyShortDTO[]> {
    return this.http.get<BiographyShortDTO[]>(environment.BIOGRAPHIES_URL);
  }

  getAllWithFilters(page: XPage, searchCriteria: BiographiesSearchCriteria): Observable<PageDTO<BiographyShortDTO>> {
    const queryParams: any = { ...page };

    if (searchCriteria.surname !== null) {
      queryParams.surname = searchCriteria.surname;
    }

    if (searchCriteria.name !== null) {
      queryParams.name = searchCriteria.name;
    }

    if (searchCriteria.patronymic !== null) {
      queryParams.patronymic = searchCriteria.patronymic;
    }

    if (searchCriteria.dateOfBirth !== null) {
      queryParams.dateOfBirth = searchCriteria.dateOfBirth;
    }

    if (searchCriteria.dateOfDeath !== null) {
      queryParams.dateOfDeath = searchCriteria.dateOfDeath;
    }

    if (searchCriteria.placeOfBirth !== null) {
      queryParams.placeOfBirth = searchCriteria.placeOfBirth;
    }

    if (searchCriteria.placeOfDeath !== null) {
      queryParams.placeOfDeath = searchCriteria.placeOfDeath;
    }

    if (searchCriteria.militaryRank !== null) {
      queryParams.militaryRank = searchCriteria.militaryRank;
    }

    if (searchCriteria.medal !== null) {
      queryParams.medal = searchCriteria.medal;
    }

    if (searchCriteria.placeOfService !== null) {
      queryParams.placeOfService = searchCriteria.placeOfService;
    }

    if (searchCriteria.placeOfEmployment !== null) {
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
         images: File[], presentation: File,
         preview: File): Observable<HttpResponse<any>> {
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

    if (presentation) {
      formData.append('presentation', presentation);
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
}
