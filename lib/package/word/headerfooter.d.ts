import { PageNumberProperties } from "./parts/pagenumber";
import { DocumentBody } from "./parts/content";
import { FileIndex } from "../../index";
export declare enum HeaderFooterType {
    HEADER = "hdr",
    FOOTER = "ftr"
}
export interface HeaderFooterProperties {
    body: DocumentBody[];
    pageNumber?: PageNumberProperties;
}
export interface HeaderFooter {
    hf: HeaderFooterProperties;
    type: HeaderFooterType;
    fileIndex: FileIndex[];
    sourceName: string;
}
declare const _default: (headerOrFooter: HeaderFooter) => string;
export default _default;
