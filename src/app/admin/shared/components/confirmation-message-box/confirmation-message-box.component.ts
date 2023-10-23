import {Component} from '@angular/core';

@Component({
  selector: 'app-confirmation-message-box',
  templateUrl: './confirmation-message-box.component.html',
  styleUrls: ['./confirmation-message-box.component.scss']
})
export class ConfirmationMessageBoxComponent {
  onConfirmed!: (confirmed: boolean) => void;
  enabled = false;
  message = 'Подтвердите действие';

  open(message: string = this.message, onConfirmed: (confirmed: boolean) => void) {
    this.message = message;
    this.enabled = true;
    this.onConfirmed = onConfirmed;
  }

  onButtonClick(isConfirmed: boolean) {
    this.onConfirmed(isConfirmed);

    this.enabled = false;
    this.message = 'Подтвердите действие';
    this.onConfirmed = (confirmed)=>{};
  }
}
