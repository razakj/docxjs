import { Paragraph } from "./paragraph";
import { FileIndex } from "../../../index";
import { TableOfContents } from "./toc";
export interface DocumentBody {
    html?: string;
    url?: string;
    paragraph?: Paragraph;
    toc?: TableOfContents;
}
declare const _default: (documentBody: DocumentBody, fileIndex: FileIndex[], sourceName: string) => string;
export default _default;
