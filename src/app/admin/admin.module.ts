import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {CreateArticlePageComponent} from './create-pages/create-article-page/create-article-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {authGuardFn} from "./shared/services/auth.guard";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillEditorComponent, QuillModule} from "ngx-quill";
import {CreateMedalPageComponent} from './create-pages/create-medal-page/create-medal-page.component';
import {CreateRankPageComponent} from './create-pages/create-rank-page/create-rank-page.component';
import {CreateBiographyPageComponent} from './create-pages/create-biography-page/create-biography-page.component';
import {CreateArtifactPageComponent} from './create-pages/create-artifact-page/create-artifact-page.component';
import {
  MedalDetailsFormArrayComponent
} from './create-pages/create-biography-page/medal-details-form-array/medal-details-form-array.component';
import {
  MilitaryRankDetailsFormArrayComponent
} from './create-pages/create-biography-page/military-rank-details-form-array/military-rank-details-form-array.component';
import {
  CareerDetailsFormArrayComponent
} from './create-pages/create-biography-page/career-details-form-array/career-details-form-array.component';
import {
  MedalDetailsFormComponent
} from './create-pages/create-biography-page/medal-details-form-array/medal-details-form/medal-details-form.component';
import {
  MilitaryRankDetailsFormComponent
} from './create-pages/create-biography-page/military-rank-details-form-array/military-rank-details-form/military-rank-details-form.component';
import {
  CareerDetailsFormComponent
} from './create-pages/create-biography-page/career-details-form-array/career-details-form/career-details-form.component';
import {
  ConfirmationMessageBoxComponent
} from './shared/components/confirmation-message-box/confirmation-message-box.component';
import {EditMedalPageComponent} from './edit-pages/edit-medal-page/edit-medal-page.component';
import {EditRankPageComponent} from './edit-pages/edit-rank-page/edit-rank-page.component';
import {
  OneFileEntityImageEditorComponent
} from './edit-pages/one-file-entity-image-editor/one-file-entity-image-editor.component';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {
  MultipleFilesEntityImageEditorComponent
} from './edit-pages/multiple-files-entity-image-editor/multiple-files-entity-image-editor.component';
import {
  ImageEditorComponent
} from './edit-pages/multiple-files-entity-image-editor/image-editor/image-editor.component';
import {
  ImageUploaderComponent
} from './edit-pages/multiple-files-entity-image-editor/image-uploader/image-uploader.component';
import {EditArticlePageComponent} from './edit-pages/edit-article-page/edit-article-page.component';
import {EditArtifactPageComponent} from './edit-pages/edit-artifact-page/edit-artifact-page.component';
import {SelectMedalPageComponent} from './select-entity-pages/select-medal-page/select-medal-page.component';
import {SelectArticlePageComponent} from './select-entity-pages/select-article-page/select-article-page.component';
import {SelectRankPageComponent} from './select-entity-pages/select-rank-page/select-rank-page.component';
import { SelectArtifactPageComponent } from './select-entity-pages/select-artifact-page/select-artifact-page.component';
import { SelectBiographyPageComponent } from './select-entity-pages/select-biography-page/select-biography-page.component';

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
          {path: 'biographies/new', component: CreateBiographyPageComponent, canActivate: [authGuardFn]},
          {path: 'biographies/delete', component: SelectBiographyPageComponent, canActivate: [authGuardFn]},
          {path: 'biographies/edit', component: SelectBiographyPageComponent, canActivate: [authGuardFn]},
          {path: 'medals/new', component: CreateMedalPageComponent, canActivate: [authGuardFn]},
          {path: 'medals/edit', component: SelectMedalPageComponent, canActivate: [authGuardFn]},
          {path: 'medals/delete', component: SelectMedalPageComponent, canActivate: [authGuardFn]},
          {path: 'medals/:id/edit', component: EditMedalPageComponent, canActivate: [authGuardFn]},
          {path: 'articles/new', component: CreateArticlePageComponent, canActivate: [authGuardFn]},
          {path: 'articles/delete', component: SelectArticlePageComponent, canActivate: [authGuardFn]},
          {path: 'articles/edit', component: SelectArticlePageComponent, canActivate: [authGuardFn]},
          {path: 'articles/:id/edit', component: EditArticlePageComponent, canActivate: [authGuardFn]},
          {path: 'ranks/new', component: CreateRankPageComponent, canActivate: [authGuardFn]},
          {path: 'ranks/delete', component: SelectRankPageComponent, canActivate: [authGuardFn]},
          {path: 'ranks/edit', component: SelectRankPageComponent, canActivate: [authGuardFn]},
          {path: 'ranks/:id/edit', component: EditRankPageComponent, canActivate: [authGuardFn]},
          {path: 'artifacts/new', component: CreateArtifactPageComponent, canActivate: [authGuardFn]},
          {path: 'artifacts/edit', component: SelectArtifactPageComponent, canActivate: [authGuardFn]},
          {path: 'artifacts/delete', component: SelectArtifactPageComponent, canActivate: [authGuardFn]},
          {path: 'artifacts/:id/edit', component: EditArtifactPageComponent, canActivate: [authGuardFn]},
        ]
      }
    ]),
    ReactiveFormsModule,
    QuillModule.forRoot(),
    QuillEditorComponent,
    FormsModule,
    CollapseModule
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
    EditMedalPageComponent,
    EditRankPageComponent,
    OneFileEntityImageEditorComponent,
    MultipleFilesEntityImageEditorComponent,
    ImageEditorComponent,
    ImageUploaderComponent,
    EditArticlePageComponent,
    EditArtifactPageComponent,
    SelectMedalPageComponent,
    SelectArticlePageComponent,
    SelectRankPageComponent,
    SelectArtifactPageComponent,
    SelectBiographyPageComponent,
  ],
})
export class AdminModule {
}
