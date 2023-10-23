import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export interface CreatorWithMultipleFiles<U> {
    create(uploadDTO: U, files: File[] | null, preview: File, options: {}): Observable<HttpResponse<any>>;
}
