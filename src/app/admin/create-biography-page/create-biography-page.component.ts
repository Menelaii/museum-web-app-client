import {Component, inject} from '@angular/core';
import {MultipleFileUploadForm} from "../shared/upload-forms/multiple-file-upload-form";
import {BiographiesService} from "../../shared/services/biographies.service";
import {BiographyUploadDTO} from "../../shared/interfaces/biographies/biography-upload.dto";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MedalShortDTO} from "../../shared/interfaces/medals/medal-short.dto";
import {MilitaryRankShortDTO} from "../../shared/interfaces/military-ranks/military-rank-short.dto";
import {OptionsService} from "../../shared/services/options.service";
import {MedalDetailsUploadDTO} from "../../shared/interfaces/details/medal-details-upload.dto";
import {MilitaryRankDetailsUploadDTO} from "../../shared/interfaces/details/military-rank-details-upload.dto";
import {CareerDetailsDTO} from "../../shared/interfaces/details/career-details.dto";

@Component({
  selector: 'app-create-biography-page',
  templateUrl: './create-biography-page.component.html',
  styleUrls: ['./create-biography-page.component.scss']
})
export class CreateBiographyPageComponent extends MultipleFileUploadForm<BiographiesService, BiographyUploadDTO> {
  medals: MedalShortDTO[] = [];
  ranks: MilitaryRankShortDTO[] = [];
  isOptionsLoading = true;
  selectedPresentation: File | null = null;

  constructor(private optionsService: OptionsService) {
    super();

    this.optionsService.getBiographyCreationOptions().subscribe(value => {
      this.medals = value.medals;
      this.ranks = value.militaryRanks;
      this.isOptionsLoading = false;
    });
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
        medalDetailsArray: new FormArray([
          new FormGroup({
            dateOfAward: new FormControl(),
            placeOfAward: new FormControl(),
            medal: new FormControl(null, [
              Validators.required
            ]),
          })
        ])
      }),
      militaryRankDetails: new FormGroup({
        militaryRankDetailsArray: new FormArray([
          new FormGroup({
            dateOfAssigment: new FormControl(),
            rank: new FormControl(null, [
              Validators.required
            ]),
          })
        ])
      }),
      serviceDetails: new FormGroup({
        careerDetailsArray: new FormArray([
          new FormGroup({
            placeOfService: new FormControl(null, [
              Validators.required
            ]),
            position: new FormControl(null, [
              Validators.required
            ]),
            startDate: new FormControl(),
            endDate: new FormControl(),
          })
        ])
      }),
      employmentDetails: new FormGroup({
        careerDetailsArray: new FormArray([
          new FormGroup({
            placeOfService: new FormControl(null, [
              Validators.required
            ]),
            position: new FormControl(null, [
              Validators.required
            ]),
            startDate: new FormControl(),
            endDate: new FormControl(),
          })
        ])
      }),
      preview: new FormControl('', [
        Validators.required
      ]),
      presentation: new FormControl(''),
      images: new FormArray([
        new FormControl('')
      ])
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

  create(): Observable<HttpResponse<any>> {
    if (!this.selectedFile) {
      throw new Error('Illegal State: File Not Found');
    }

    const formData: BiographyUploadDTO = this.formValuesToUploadDTO();

    const images: File[] | null = this.selectedFiles;
    const preview: File = this.selectedFile;
    const presentation: File | null = this.selectedPresentation;

    return this.service.create(formData, images, presentation, preview);
  }

  onPresentationChanged($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    this.selectedPresentation = input.files[0] as File;
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
