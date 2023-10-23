import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {MedalUploadDTO} from "../interfaces/medals/medal-upload.dto";
import {TokenStorageService} from "./token-storage.service";
import {MedalShortDTO} from "../interfaces/medals/medal-short.dto";
import {OneFileEntityService} from "../interfaces/service/one-file-entity-service";
import {MedalDTO} from "../interfaces/medals/medal.dto";

@Injectable()
export class MedalsService implements OneFileEntityService<MedalDTO, MedalUploadDTO> {

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAll() {
    return this.http.get<MedalShortDTO[]>(environment.MEDALS_URL);
  }

  getById(id: number): Observable<MedalDTO> {
    return this.http.get<MedalDTO>(`${environment.MEDALS_URL}/${id}`);
  }

  create(uploadDTO: MedalUploadDTO, image: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('medal', new Blob([JSON.stringify(uploadDTO)], {
      type: 'application/json'
    }));
    formData.append('image', image);

    return this.http.post<HttpResponse<any>>(environment.MEDALS_URL, formData, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response'
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${environment.MEDALS_URL}/${id}`, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response'
    })
  }

  edit(id: number, uploadDTO: MedalUploadDTO): Observable<HttpResponse<any>> {
    return this.http.patch<HttpResponse<any>>(
      `${environment.MEDALS_URL}/${id}`, uploadDTO,
      {headers: this.tokenStorageService.getAuthHeader(), observe: 'response'}
    );
  }

  changePreview(id: number, image: File): Observable<HttpResponse<any>> {
    return this.http.patch(
      `${environment.MEDALS_URL}/${id}/preview`,
      image,
      {headers: this.tokenStorageService.getAuthHeader(), observe: 'response'}
    );
  }
}
