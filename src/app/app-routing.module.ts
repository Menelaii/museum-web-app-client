import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {AboutPageComponent} from "./about-page/about-page.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'about', component: AboutPageComponent},
      {path: 'error', component: ErrorPageComponent},
      {
        path: 'artifacts', loadChildren: () => import('./artifacts/artifacts.module').then(m => m.ArtifactsModule)
      },
      {
        path: 'biographies', loadChildren: () => import('./biographies/biographies.module').then(m => m.BiographiesModule)
      },
      {
        path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
