import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BiographyFilterOptionsDTO} from "../interfaces/biographies/biography-filter-options.dto";
import {environment} from "../../../environments/environment.dev";
import {BiographyCreationOptionsDTO} from "../interfaces/biographies/biography-creation-options-d-t.o";

@Injectable()
export class OptionsService {

  constructor(private http: HttpClient) {
  }

  getBiographyFilterOptions(): Observable<BiographyFilterOptionsDTO> {
    return this.http.get<BiographyFilterOptionsDTO>(`${environment.BIOGRAPHY_FILTER_OPTIONS_URL}`);
  }

  getBiographyCreationOptions(): Observable<BiographyCreationOptionsDTO> {
    return this.http.get<BiographyCreationOptionsDTO>(`${environment.BIOGRAPHY_CREATION_OPTIONS_URL}`);
  }
}
