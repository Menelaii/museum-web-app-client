import {Component, ViewChild} from '@angular/core';
import {CarouselComponent} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-museum-online',
  templateUrl: './museum-online.component.html',
  styleUrls: ['./museum-online.component.scss']
})
export class MuseumOnlineComponent {
  @ViewChild('museumOnlineCarousel') carousel!: CarouselComponent;

  showIndicators = false;
  interval = 0;

  next() {
    this.carousel.nextSlide();
  }

  prev() {
    this.carousel.previousSlide();
  }
}
