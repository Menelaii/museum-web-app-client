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

  createControl() {
    this.formArray.push(this.factoryFunc());
  }

  addControl(control: C) {
    this.formArray.push(control);
  }

  removeLastControl() {
    this.formArray.removeAt(this.formArray.length - 1);
  }

  reset() {
    this.formArray.reset();
  }
}
