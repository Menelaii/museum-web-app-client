import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Remover {
  delete(id: number): Observable<HttpResponse<any>>
}
