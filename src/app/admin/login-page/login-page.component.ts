import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {AuthDTO} from "../../shared/interfaces/auth/auth.dto";
import {Observer} from "rxjs";
import {AuthResponseDTO} from "../../shared/interfaces/auth/auth-response.dto";
import {TokenStorageService} from "../../shared/services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  form: FormGroup;
  isSubmitted = false;
  error = false;

  constructor(private service: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router)
  {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onSubmit() {
    if (this.isSubmitted || this.form.invalid) {
      return;
    }

    this.isSubmitted = true;

    const formData: AuthDTO = {...this.form.value}

    const observer: Observer<AuthResponseDTO | null> = {
      complete: () =>  {
      },

      error: (err: any) => {
        this.error = true;
        this.isSubmitted = false;
      },

      next: (value: AuthResponseDTO | null) => {
        if (value) {
          this.tokenStorage.setToken(value);
          this.router.navigate(['/admin', 'dashboard']);

          this.isSubmitted = false;
          this.error = false;
        }
      }
    }

    this.service.signIn(formData).subscribe(observer);
  }
}
