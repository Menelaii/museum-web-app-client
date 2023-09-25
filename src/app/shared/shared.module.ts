import {NgModule} from "@angular/core";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {CommonModule} from "@angular/common";
import {ArtifactsService} from "./services/artifacts.service";
import {AuthService} from "./services/auth.service";
import {BiographiesService} from "./services/biographies.service";
import {MedalsService} from "./services/medals.service";
import {MilitaryRanksService} from "./services/military-ranks.service";
import {TokenStorageService} from "./services/token-storage.service";
import {RouterModule} from "@angular/router";
import {RuDatePipe} from "./pipes/ru-date.pipe";
import {OptionsService} from "./services/options.service";
import { PaginationComponent } from './components/pagination/pagination.component';
import {ArticlesService} from "./services/articles.service";
import {EnumTranslatorService} from "./services/enum-translator.service";
import { FullscreenImageViewComponent } from './components/fullscreen-image-view/fullscreen-image-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    MainLayoutComponent,
    RuDatePipe,
    PaginationComponent,
    FullscreenImageViewComponent
  ],
  providers: [
    ArtifactsService,
    AuthService,
    BiographiesService,
    MedalsService,
    MilitaryRanksService,
    TokenStorageService,
    OptionsService,
    ArticlesService,
    EnumTranslatorService
  ],
  exports: [
    CommonModule,
    RouterModule,
    RuDatePipe,
    PaginationComponent,
    FullscreenImageViewComponent,
  ]
})
export class SharedModule {}
