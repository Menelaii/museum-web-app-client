import {ActivatedRoute, Router} from "@angular/router";
import {DeleteForm} from "./delete-form";
import {Remover} from "../../../shared/interfaces/Remover";

export class ConfirmationForm<S extends Remover> extends DeleteForm<S>{

  constructor(router: Router, route: ActivatedRoute, service: S) {
    super(router, route, service);
  }

  confirm() {
    this.delete();
  }

  cancel() {
    this.navigateToDashboard();
  }
}
