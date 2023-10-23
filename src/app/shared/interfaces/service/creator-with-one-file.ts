import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export interface CreatorWithOneFile<U> {
  create(uploadDTO: U, file: File): Observable<HttpResponse<any>>
}
