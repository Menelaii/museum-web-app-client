import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export interface Editor<E, U> {

  getById(id: number): Observable<E>;

  edit(id: number, uploadDTO: U): Observable<HttpResponse<any>>
}
