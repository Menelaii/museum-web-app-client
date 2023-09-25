import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import { ArtifactsPageComponent } from './artifacts-page/artifacts-page.component';
import {ArtifactPageComponent} from "./artifact-page/artifact-page.component";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {CollapseModule} from "ngx-bootstrap/collapse";
import { ArtifactFiltersComponent } from './artifact-filters/artifact-filters.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArtifactCardComponent } from './artifact-card/artifact-card.component';

@NgModule({
  declarations: [
    ArtifactPageComponent,
    ArtifactsPageComponent,
    ArtifactFiltersComponent,
    ArtifactCardComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ArtifactsPageComponent},
      {path: ':id', component: ArtifactPageComponent}
    ]),
    CarouselModule,
    CollapseModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class ArtifactsModule {}
