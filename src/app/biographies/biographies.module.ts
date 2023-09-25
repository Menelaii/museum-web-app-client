import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import { BiographiesPageComponent } from './biographies-page/biographies-page.component';
import { BiographyPageComponent } from './biography-page/biography-page.component';
import {CarouselModule} from "ngx-bootstrap/carousel";
import { BiographyCardComponent } from './biography-card/biography-card.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import { BiographiesFiltersComponent } from './biographies-filters/biographies-filters.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MedalDetailedViewComponent } from './medal-detailed-view/medal-detailed-view.component';

@NgModule({
  declarations: [
    BiographiesPageComponent,
    BiographyPageComponent,
    BiographyCardComponent,
    BiographiesFiltersComponent,
    MedalDetailedViewComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: BiographiesPageComponent},
      {path: ':id', component: BiographyPageComponent}
    ]),
    CarouselModule,
    CollapseModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class BiographiesModule {}
