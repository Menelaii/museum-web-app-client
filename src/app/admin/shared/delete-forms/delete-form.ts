import {ActivatedRoute, Router} from "@angular/router";
import {Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Remover} from "../../../shared/interfaces/Remover";

export abstract class DeleteForm<S extends Remover> {
  router: Router;
  route: ActivatedRoute;
  service: S;

  protected constructor(router: Router, route: ActivatedRoute, service: S) {
    this.router = router;
    this.service = service;
    this.route = route;
  }

  delete() {
    const observer: Observer<HttpResponse<any>> = {
      next: (value: HttpResponse<any>) => {
      },
      error: (err: any) => {
      },
      complete: () => {
        this.navigateToDashboard();
      }
    }

    const id: number = this.route.snapshot.params['id'];
    this.service.delete(id).subscribe(observer);
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/dashboard'])
  }
}
