import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
  error: HttpErrorResponse | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
    this.error = this.activatedRoute.snapshot.data['state'].error;
  }
}
