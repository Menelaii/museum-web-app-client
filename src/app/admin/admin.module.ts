import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreateArticlePageComponent } from './create-pages/create-article-page/create-article-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {authGuardFn} from "./shared/services/auth.guard";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import { CreateMedalPageComponent } from './create-pages/create-medal-page/create-medal-page.component';
import { CreateRankPageComponent } from './create-pages/create-rank-page/create-rank-page.component';
import { CreateBiographyPageComponent } from './create-pages/create-biography-page/create-biography-page.component';
import { CreateArtifactPageComponent } from './create-pages/create-artifact-page/create-artifact-page.component';
import { MedalDetailsFormArrayComponent } from './create-pages/create-biography-page/medal-details-form-array/medal-details-form-array.component';
import { MilitaryRankDetailsFormArrayComponent } from './create-pages/create-biography-page/military-rank-details-form-array/military-rank-details-form-array.component';
import { CareerDetailsFormArrayComponent } from './create-pages/create-biography-page/career-details-form-array/career-details-form-array.component';
import { MedalDetailsFormComponent } from './create-pages/create-biography-page/medal-details-form-array/medal-details-form/medal-details-form.component';
import { MilitaryRankDetailsFormComponent } from './create-pages/create-biography-page/military-rank-details-form-array/military-rank-details-form/military-rank-details-form.component';
import { CareerDetailsFormComponent } from './create-pages/create-biography-page/career-details-form-array/career-details-form/career-details-form.component';
import { ConfirmationMessageBoxComponent } from './shared/components/confirmation-message-box/confirmation-message-box.component';
import { DeleteArticleConfirmationPageComponent } from './delete-pages/delete-article-confirmation-page/delete-article-confirmation-page.component';
import { DeleteBiographyPageComponent } from './delete-pages/delete-biography-page/delete-biography-page.component';
import { DeleteArtifactPageComponent } from './delete-pages/delete-artifact-page/delete-artifact-page.component';
import { DeleteMedalPageComponent } from './delete-pages/delete-medal-page/delete-medal-page.component';
import {DeleteRankPageComponent} from "./delete-pages/delete-rank-page/delete-rank-page.component";
import { EditMedalPageComponent } from './edit-pages/edit-medal-page/edit-medal-page.component';
import { EditRankPageComponent } from './edit-pages/edit-rank-page/edit-rank-page.component';

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
                    {path: 'articles/delete', component: DeleteArticleConfirmationPageComponent, canActivate: [authGuardFn]},
                    {path: 'biographies/delete', component: DeleteBiographyPageComponent, canActivate: [authGuardFn]},
                    {path: 'artifacts/delete', component: DeleteArtifactPageComponent, canActivate: [authGuardFn]},
                    {path: 'medals/delete', component: DeleteMedalPageComponent, canActivate: [authGuardFn]},
                    {path: 'ranks/delete', component: DeleteRankPageComponent, canActivate: [authGuardFn]},
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
    ConfirmationMessageBoxComponent,
    DeleteArticleConfirmationPageComponent,
    DeleteBiographyPageComponent,
    DeleteArtifactPageComponent,
    DeleteMedalPageComponent,
    DeleteRankPageComponent,
    EditMedalPageComponent,
    EditRankPageComponent,
  ]
})
export class AdminModule {
}
