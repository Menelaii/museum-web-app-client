import {UploadForm} from "../upload-form";
import {Editor} from "../../../../shared/interfaces/service/editor";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

export abstract class EditForm<E, U, S extends Editor<E, U>> extends UploadForm<S, U> {
  existingEntity!: E;
  isLoading = true;
  entityId: number;

  //todo snapshot в конструкторе
  constructor() {
    super();
    this.entityId = this.getActivatedRoute().snapshot.params['id'];
    this.fetch();
  }

  fetch() {
    this.isLoading = true;
    this.service.getById(this.entityId).subscribe(value => {
      this.existingEntity = value;
      this.initializeForm(this.existingEntity);
      this.isLoading = false;
    });
  }

  initializeForm(entity: E) {
    if (entity) {
      this.form.patchValue({
        ...entity
      });
    }
  }

  submit(): Observable<HttpResponse<any>> {
    const uploadDTO = this.formValuesToUploadDTO();
    return this.service.edit(this.entityId, uploadDTO);
  }

  override onComplete() {
  }

  abstract getActivatedRoute(): ActivatedRoute;
}
