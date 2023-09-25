import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {MedalUploadDTO} from "../interfaces/medals/medal-upload.dto";
import {TokenStorageService} from "./token-storage.service";
import {Creator} from "../interfaces/creator";

@Injectable()
export class MedalsService implements Creator<MedalUploadDTO> {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

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
}
