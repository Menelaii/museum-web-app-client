import {
  ConfirmationMessageBoxComponent
} from "./components/confirmation-message-box/confirmation-message-box.component";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

export abstract class SelectPage<E extends {id: number}, S> {
  abstract messageBox: ConfirmationMessageBoxComponent;

  entities$: Observable<E[]>;
  selected: {id: number} | null;
  action: string;
  entityCode: string;
  router: Router;
  service: S;

  protected constructor(router: Router, service: S) {
    this.router = router;
    this.service = service;
    this.selected = null;
    this.entities$ = this.getAllEntities();

    const segments: string[] = window.location.href.split('/');
    this.action = segments.pop() ?? '';
    this.entityCode = segments.pop() ?? '';
  }

  onEntityClick(entity: E) {
    this.selected = entity;

    if (this.action == 'delete') {
      const onConfirmedBound = this.onConfirmed.bind(this);
      this.messageBox.open(this.buildMessage(entity), onConfirmedBound);
    } else if (this.action == 'edit') {
      this.onEdit(this.selected.id);
    } else {
      throw new Error('Invalid action ' + this.action);
    }
  }

  buildMessage(entity: E): string {
    let message: string;
    if (this.action == 'delete') {
      message = this.buildDeleteMessage(entity);
    } else {
      throw new Error('Invalid action ' + this.action);
    }

    return message;
  }

  onConfirmed(confirmed: boolean) {
    if (!this.selected || !confirmed) {
      return;
    }

    if (this.action == 'delete') {
      this.onDelete(this.selected.id);
    } else {
      throw new Error('Invalid action ' + this.action);
    }
  }

  onEdit(id: number): void {
    this.router.navigate(['/admin',
      this.entityCode,
      id,
      'edit'
    ])
  }

  abstract getAllEntities(): Observable<E[]>;

  abstract buildDeleteMessage(entity: E): string;

  abstract onDelete(id: number): void;
}
