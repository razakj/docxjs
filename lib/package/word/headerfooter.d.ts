import { Paragraph } from "./parts/paragraph";
import { PageNumberProperties } from "./parts/pagenumber";
import { ImageIndex } from './parts/image';
export declare enum HeaderFooterType {
    HEADER = "hdr",
    FOOTER = "ftr"
}
export interface HeaderFooterProperties {
    paragraphs: Paragraph[];
    pageNumber?: PageNumberProperties;
}
export interface HeaderFooter {
    hf: HeaderFooterProperties;
    type: HeaderFooterType;
    imageIndex: ImageIndex[];
    sourceName: string;
}
declare const _default: (headerOrFooter: HeaderFooter) => string;
export default _default;
