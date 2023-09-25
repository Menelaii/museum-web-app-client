import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {inject} from "@angular/core";

export const authGuardFn = (): Promise<boolean> | boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/admin', 'login']);
    return false;
  }
};
