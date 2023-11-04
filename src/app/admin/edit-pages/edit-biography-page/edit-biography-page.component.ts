import {Component, inject, ViewChild} from '@angular/core';
import {
  MultipleFilesEntityImageEditorComponent
} from "../multiple-files-entity-image-editor/multiple-files-entity-image-editor.component";
import {DateFormatService} from "../../shared/services/date-format.service";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MultipleFilesEntityEditForm} from "../../shared/upload-forms/edit-forms/multiple-files-entity-edit-form";
import {BiographiesService} from "../../../shared/services/biographies.service";
import {BiographyDTO} from "../../../shared/interfaces/biographies/biography.dto";
import {BiographyUploadDTO} from "../../../shared/interfaces/biographies/biography-upload.dto";
import {ImageAttachmentDTO} from "../../../shared/interfaces/file-attachments/image-attachment.dto";
import {MedalDetailsUploadDTO} from "../../../shared/interfaces/details/medal-details-upload.dto";
import {MilitaryRankDetailsUploadDTO} from "../../../shared/interfaces/details/military-rank-details-upload.dto";
import {CareerDetailsDTO} from "../../../shared/interfaces/details/career-details.dto";
import {OptionsService} from "../../../shared/services/options.service";
import {MedalShortDTO} from "../../../shared/interfaces/medals/medal-short.dto";
import {MilitaryRankShortDTO} from "../../../shared/interfaces/military-ranks/military-rank-short.dto";
import {PresentationEditorComponent} from "./presentation-editor/presentation-editor.component";

@Component({
  selector: 'app-edit-biography-page',
  templateUrl: './edit-biography-page.component.html',
  styleUrls: ['./edit-biography-page.component.scss']
})
export class EditBiographyPageComponent extends MultipleFilesEntityEditForm<BiographyDTO, BiographyUploadDTO, BiographiesService> {
  @ViewChild(MultipleFilesEntityImageEditorComponent) imageEditor!: MultipleFilesEntityImageEditorComponent;
  @ViewChild(PresentationEditorComponent) presentationEditor!: PresentationEditorComponent;

  entityCode = 'biographies';

  medals: MedalShortDTO[] = [];
  ranks: MilitaryRankShortDTO[] = [];
  isOptionsLoading = true;
  isPresentationEditorCollapsed = true;

  constructor(private dateFormatter: DateFormatService,
              private optionsService: OptionsService) {
    super();

    this.optionsService.getBiographyCreationOptions().subscribe(value => {
      this.medals = value.medals;
      this.ranks = value.militaryRanks;
      this.isOptionsLoading = false;
    });
  }

  getActivatedRoute(): ActivatedRoute {
    return inject(ActivatedRoute);
  }

  getService(): BiographiesService {
    return inject(BiographiesService);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      surname: new FormControl(null, [
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      patronymic: new FormControl(null, [
        Validators.required
      ]),
      birthDate: new FormControl(null, [
        Validators.required
      ]),
      dateOfDeath: new FormControl(),
      placeOfBirth: new FormControl(),
      placeOfDeath: new FormControl(),
      medalDetails: new FormGroup({
        medalDetailsArray: new FormArray([])
      }),
      militaryRankDetails: new FormGroup({
        militaryRankDetailsArray: new FormArray([])
      }),
      serviceDetails: new FormGroup({
        careerDetailsArray: new FormArray([])
      }),
      employmentDetails: new FormGroup({
        careerDetailsArray: new FormArray([])
      }),
    });
  }

  formValuesToUploadDTO(): BiographyUploadDTO {
    return {
      surname: this.form.value.surname,
      name: this.form.value.name,
      patronymic: this.form.value.patronymic,
      placeOfBirth: this.form.value.placeOfBirth,
      placeOfDeath: this.form.value.placeOfDeath,
      birthDate: this.form.value.birthDate,
      dateOfDeath: this.form.value.dateOfDeath,
      medalDetails: this.extractMedalDetails(this.form),
      employmentHistory: this.extractEmploymentDetails(this.form),
      militaryRankDetails: this.extractMilitaryRankDetails(this.form),
      militaryServiceDetails: this.extractServiceDetails(this.form),
    };
  }

  onPresentationEditorCollapseClick() {
    this.isPresentationEditorCollapsed = !this.isPresentationEditorCollapsed;
    if (!this.isPresentationEditorCollapsed) {
      this.presentationEditor.init(
        this.existingEntity.id,
        this.existingEntity.presentation
      );
    }
  }

  override onChangesSubmitted = () => {
    super.onChangesSubmitted();
    this.isPresentationEditorCollapsed = true;
  }

  extractImages(entity: BiographyDTO): ImageAttachmentDTO[] {
    return entity.images;
  }

  override initializeForm(entity: BiographyDTO) {
    super.initializeForm(entity);

    this.form.patchValue({
      birthDate: this.dateFormatter.transform(this.existingEntity.birthDate)
    });

    this.form.patchValue({
      dateOfDeath: this.dateFormatter.transform(this.existingEntity.dateOfDeath)
    });
  }

  getMedalDetailsSubForm(): FormGroup {
    return this.form.controls['medalDetails'] as FormGroup;
  }

  getMilitaryRankDetailsSubForm() {
    return this.form.controls['militaryRankDetails'] as FormGroup;
  }

  getServiceDetailsSubForm() {
    return this.form.controls['serviceDetails'] as FormGroup;
  }

  getEmploymentDetailsSubForm() {
    return this.form.controls['employmentDetails'] as FormGroup;
  }

  private extractMedalDetails(form: FormGroup) {
    const medals: MedalDetailsUploadDTO[] = [];
    const medalDetailsArray = form.get('medalDetails.medalDetailsArray') as FormArray;

    medals.push(...medalDetailsArray.controls.map(control => control.value as MedalDetailsUploadDTO));

    return medals;
  }

  private extractMilitaryRankDetails(form: FormGroup): MilitaryRankDetailsUploadDTO[] {
    const militaryRanks: MilitaryRankDetailsUploadDTO[] = [];
    const militaryRankDetailsArray = form.get('militaryRankDetails.militaryRankDetailsArray') as FormArray;

    militaryRanks.push(...militaryRankDetailsArray.controls.map(control => control.value as MilitaryRankDetailsUploadDTO));

    return militaryRanks;
  }

  private extractEmploymentDetails(form: FormGroup): CareerDetailsDTO[] {
    const careerDetails: CareerDetailsDTO[] = [];
    const careerDetailsArray = form.get('employmentDetails.careerDetailsArray') as FormArray;

    careerDetails.push(...careerDetailsArray.controls.map(control => control.value as CareerDetailsDTO));

    return careerDetails;
  }

  private extractServiceDetails(form: FormGroup): CareerDetailsDTO[] {
    const careerDetails: CareerDetailsDTO[] = [];
    const careerDetailsArray = form.get('serviceDetails.careerDetailsArray') as FormArray;

    careerDetails.push(...careerDetailsArray.controls.map(control => control.value as CareerDetailsDTO));

    return careerDetails;
  }
}
