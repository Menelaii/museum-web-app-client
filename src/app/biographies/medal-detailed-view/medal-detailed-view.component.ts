import {Component, Input} from '@angular/core';
import {MedalDetailsDTO} from "../../shared/interfaces/details/medal-details.dto";

@Component({
  selector: 'app-medal-detailed-view',
  templateUrl: './medal-detailed-view.component.html',
  styleUrls: ['./medal-detailed-view.component.scss']
})
export class MedalDetailedViewComponent {
  @Input() medalDetails: MedalDetailsDTO | null = null;
}
