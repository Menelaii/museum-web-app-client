import {UploadForm} from "./upload-form";
import {Editor} from "../../../shared/interfaces/service/editor";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

export abstract class EditForm<E, U, S extends Editor<E, U>> extends UploadForm<S, U> {
    existingEntity!: E;
    isLoading = true;
    entityId: number;

    constructor(route: ActivatedRoute) {
        super();
        this.entityId = route.snapshot.params['id'];
        this.service.getById(this.entityId).subscribe(value => {
            this.existingEntity = value;
            this.isLoading = false;
            this.initializeForm(this.existingEntity);
        });
    }

    submit(): Observable<HttpResponse<any>> {
        const uploadDTO = this.formValuesToUploadDTO();
        return this.service.edit(this.entityId, uploadDTO);
    }

    initializeForm(entity: E) {
        if (entity) {
            this.form.patchValue({
                ...entity
            });
        }
    }
}
