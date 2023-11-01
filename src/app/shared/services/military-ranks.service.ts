import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {MilitaryRankDTO} from "../interfaces/military-ranks/military-rank.dto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment.dev";
import {TokenStorageService} from "./token-storage.service";
import {MilitaryRankUploadDTO} from "../interfaces/military-ranks/military-rank-upload.dto";
import {OneFileEntityService} from "../interfaces/service/one-file-entity-service";

@Injectable()
export class MilitaryRanksService implements OneFileEntityService<MilitaryRankDTO, MilitaryRankUploadDTO>{

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  getAll(): Observable<MilitaryRankDTO[]> {
    return this.http.get<MilitaryRankDTO[]>(environment.MILITARY_RANKS_URL);
  }

  getById(id: number): Observable<MilitaryRankDTO> {
    return this.http.get<MilitaryRankDTO>(`${environment.MILITARY_RANKS_URL}/${id}`);
  }

  create(militaryRankUploadDTO: MilitaryRankUploadDTO, image: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('militaryRank', new Blob([JSON.stringify(militaryRankUploadDTO)], {
      type: 'application/json'
    }));
    formData.append('image', image);

    return this.http.post<HttpResponse<any>>(environment.MILITARY_RANKS_URL, formData, {
      headers: this.tokenStorageService.getAuthHeader(),
      observe: 'response'
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      ...this.tokenStorageService.getAuthHeader()
    });

    return this.http.delete<HttpResponse<any>>(`${environment.MILITARY_RANKS_URL}/${id}`, {
      headers: headers,
      observe: 'response'
    });
  }

  edit(id: number, uploadDTO: MilitaryRankUploadDTO): Observable<HttpResponse<any>> {
    return this.http.patch<HttpResponse<any>>(
      `${environment.MILITARY_RANKS_URL}/${id}`,
      uploadDTO,
      { headers: this.tokenStorageService.getAuthHeader(), observe: 'response' }
    );
  }
}
