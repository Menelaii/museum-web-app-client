import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateArticlePageComponent } from './create-article-page/create-article-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {authGuardFn} from "./shared/services/auth.guard";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import { CreateMedalPageComponent } from './create-medal-page/create-medal-page.component';
import { CreateRankPageComponent } from './create-rank-page/create-rank-page.component';
import { CreateBiographyPageComponent } from './create-biography-page/create-biography-page.component';
import { CreateArtifactPageComponent } from './create-artifact-page/create-artifact-page.component';
import { MedalDetailsFormArrayComponent } from './create-biography-page/medal-details-form-array/medal-details-form-array.component';
import { MilitaryRankDetailsFormArrayComponent } from './create-biography-page/military-rank-details-form-array/military-rank-details-form-array.component';
import { CareerDetailsFormArrayComponent } from './create-biography-page/career-details-form-array/career-details-form-array.component';
import { MedalDetailsFormComponent } from './create-biography-page/medal-details-form-array/medal-details-form/medal-details-form.component';
import { MilitaryRankDetailsFormComponent } from './create-biography-page/military-rank-details-form-array/military-rank-details-form/military-rank-details-form.component';
import { CareerDetailsFormComponent } from './create-biography-page/career-details-form-array/career-details-form/career-details-form.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuardFn]},
                    {path: 'articles/new', component: CreateArticlePageComponent, canActivate: [authGuardFn]},
                    {path: 'medals/new', component: CreateMedalPageComponent, canActivate: [authGuardFn]},
                    {path: 'ranks/new', component: CreateRankPageComponent, canActivate: [authGuardFn]},
                    {path: 'artifacts/new', component: CreateArtifactPageComponent, canActivate: [authGuardFn]},
                    {path: 'biographies/new', component: CreateBiographyPageComponent, canActivate: [authGuardFn]},
                ]
            }
        ]),
        ReactiveFormsModule,
        QuillModule.forRoot(),
        QuillEditorComponent,
        FormsModule,
    ],
  exports: [
    RouterModule
  ],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    CreateArticlePageComponent,
    DashboardComponent,
    CreateMedalPageComponent,
    CreateRankPageComponent,
    CreateBiographyPageComponent,
    CreateArtifactPageComponent,
    MedalDetailsFormArrayComponent,
    MilitaryRankDetailsFormArrayComponent,
    CareerDetailsFormArrayComponent,
    MedalDetailsFormComponent,
    MilitaryRankDetailsFormComponent,
    CareerDetailsFormComponent,
  ]
})
export class AdminModule {
}
