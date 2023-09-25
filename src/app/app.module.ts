import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import { AboutPageComponent } from './about-page/about-page.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AboutUsComponent } from './home-page/sections/about-us/about-us.component';
import { MuseumOnlineComponent } from './home-page/sections/museum-online/museum-online.component';
import { LastNewsComponent } from './home-page/sections/last-news/last-news.component';
import {NewsModule} from "./news/news.module";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {CollapseModule} from "ngx-bootstrap/collapse";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    AboutUsComponent,
    MuseumOnlineComponent,
    LastNewsComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    NewsModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
