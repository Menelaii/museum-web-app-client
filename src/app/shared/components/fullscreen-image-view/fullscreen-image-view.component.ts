import { Component } from '@angular/core';

@Component({
  selector: 'app-fullscreen-image-view',
  templateUrl: './fullscreen-image-view.component.html',
  styleUrls: ['./fullscreen-image-view.component.scss']
})
export class FullscreenImageViewComponent {
  selectedImage: string = '';
  enabled: boolean = false;

  open(src: string) {
    this.selectedImage = src;
    this.enabled = true;
  }

  close() {
    this.enabled = false;
  }
}
