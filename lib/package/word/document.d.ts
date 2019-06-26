import { ContentOptions } from "../contenttypes";
import { DocumentBody } from "./parts/content";
import { FileIndex } from "../../index";
export declare enum DocumentOrientation {
    PORTRAIT = "portrait",
    LANDSCAPE = "landscape"
}
export interface DocumentProperties {
    pageWidthInCm?: number;
    pageHeightInCm?: number;
    marginTopInCm?: number;
    marginBottomInCm?: number;
    marginLeftInCm?: number;
    marginRightInCm?: number;
    headerFromTopInCm?: number;
    footerFromBottomInCm?: number;
    gutterInCm?: number;
    orientation?: DocumentOrientation;
}
declare const _default: (documentBody: DocumentBody[], documentProperties: DocumentProperties, contentOptions: ContentOptions, fileIndex: FileIndex[]) => string;
export default _default;
