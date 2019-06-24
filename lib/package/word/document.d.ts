import { ContentOptions } from "../contenttypes";
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
declare const _default: (documentProperties: DocumentProperties, contentOptions: ContentOptions) => string;
export default _default;
