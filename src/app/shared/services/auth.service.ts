import {Injectable} from "@angular/core";
import {AuthResponseDTO} from "../interfaces/auth/auth-response.dto";
import {Observable} from "rxjs";
import {AuthDTO} from "../interfaces/auth/auth.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.dev";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class AuthService {

  constructor(private storage: TokenStorageService,
              private http: HttpClient) {
  }

  public signIn(auth:AuthDTO):Observable<AuthResponseDTO | null> {
    return this.http.post<AuthResponseDTO>(environment.SIGN_IN_URL, auth)
  }

  public signOut() {
    this.storage.setToken(null);
  }

  public isAuthenticated():boolean {
    return this.storage.getToken() != null && !this.storage.isTokenExpired();
  }
}
