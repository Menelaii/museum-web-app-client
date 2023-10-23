import {CreatorWithOneFile} from "./creator-with-one-file";
import {Remover} from "./remover";
import {Editor} from "./editor";

export interface OneFileEntityService<E, U> extends CreatorWithOneFile<U>, Remover, Editor<E, U> {
}
