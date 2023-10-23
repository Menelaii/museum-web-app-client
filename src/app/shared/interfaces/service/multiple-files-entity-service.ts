import {CreatorWithMultipleFiles} from "./creator-with-multiple-files";
import {Editor} from "./editor";
import {Remover} from "./remover";

export interface MultipleFilesEntityService<E, U> extends CreatorWithMultipleFiles<U>, Editor<E, U>, Remover {
}
