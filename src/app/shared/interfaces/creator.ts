import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export interface Creator<U> {
  create(uploadDTO: U, preview: File): Observable<HttpResponse<any>>
}
