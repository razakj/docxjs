import { FileIndex, HtmlDocumentModifier } from "./index";
import JSZip from "jszip";
export interface Files {
    jsZip: JSZip;
    fileIndex: FileIndex[];
    htmlDocumentModifier?: HtmlDocumentModifier;
}
declare const _default: (options: Files) => Promise<void[]>;
export default _default;
