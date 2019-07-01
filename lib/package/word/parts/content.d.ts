import { Paragraph } from "./paragraph";
import { FileIndex } from "../../../index";
export interface DocumentBody {
    html?: string;
    url?: string;
    paragraph?: Paragraph;
}
declare const _default: (documentBody: DocumentBody, fileIndex: FileIndex[], sourceName: string) => string;
export default _default;
