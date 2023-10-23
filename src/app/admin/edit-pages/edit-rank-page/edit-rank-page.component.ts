import {Component, inject} from '@angular/core';
import {MilitaryRanksService} from "../../../shared/services/military-ranks.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MilitaryRankUploadDTO} from "../../../shared/interfaces/military-ranks/military-rank-upload.dto";
import {EditForm} from "../../shared/upload-forms/edit-form";
import {MilitaryRankDTO} from "../../../shared/interfaces/military-ranks/military-rank.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-rank-page',
  templateUrl: './edit-rank-page.component.html',
  styleUrls: ['./edit-rank-page.component.scss']
})
export class EditRankPageComponent
    extends EditForm<MilitaryRankDTO, MilitaryRankUploadDTO, MilitaryRanksService>
{
  getService(): MilitaryRanksService {
    return inject(MilitaryRanksService);
  }

  getActivatedRoute(): ActivatedRoute {
    return inject(ActivatedRoute);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ]),
      image: new FormControl('', [
        Validators.required,
      ])
    });
  }

  formValuesToUploadDTO(): MilitaryRankUploadDTO {
    return {
      title: this.form.value.title
    };
  }
}
