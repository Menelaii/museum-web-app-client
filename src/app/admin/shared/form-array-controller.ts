import {FormArray, FormControl, FormGroup} from "@angular/forms";

export class FormArrayController<C extends FormGroup | FormControl> {
  formArray: FormArray;
  factoryFunc: any;
  controls!: C[];

  constructor(form: FormGroup, controlName: string,
              factoryFunc: any = () => new FormControl())
  {
    this.formArray = form.get(controlName) as FormArray;
    this.factoryFunc = factoryFunc;
  }

  getControls() {
    if (!this.controls) {
      this.controls = this.formArray.controls as C[];
    }

    return this.controls;
  }

  addControl() {
    this.formArray.push(this.factoryFunc());
  }

  removeLastControl() {
    this.formArray.removeAt(this.formArray.length - 1);
  }
}
