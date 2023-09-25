import {Component, Input} from '@angular/core';
import {BiographyShortDTO} from "../../shared/interfaces/biographies/biography-short.dto";

@Component({
  selector: 'app-biography-card',
  templateUrl: './biography-card.component.html',
  styleUrls: ['./biography-card.component.scss']
})
export class BiographyCardComponent {
  @Input() biography!: BiographyShortDTO;

  getFullname() : string {
    return `${this.biography.surname} ${this.biography.name} ${this.biography.patronymic}`;
  }
}
