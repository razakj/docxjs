/// <reference types="node" />
import { FileIndex } from "../../../index";
export declare enum ImagePosition {
    INLINE = "inline",
    RELATIVE = "relative",
    ABSOLUTE = "absolute"
}
export declare enum ImageHorizontalRelativeFrom {
    CHARACTER = "character",
    COLUMN = "column",
    INSIDEMARGIN = "insideMargin",
    LEFTMARGIN = "leftMargin",
    MARGIN = "margin",
    OUTSIDEMARGIN = "outsideMargin",
    PAGE = "page",
    RIGHTMARGIN = "rightMargin"
}
export declare enum ImageVerticalRelativeFrom {
    BOTTOMMARGIN = "bottomMargin",
    INSIDEMARGIN = "insideMargin",
    LINE = "line",
    MARGIN = "margin",
    OUTSIDEMARGIN = "outsideMargin",
    PAGE = "page",
    PARAGRAPH = "paragraph",
    TOPMARGIN = "topMargin"
}
export declare enum ImageRelativePosition {
    CENTER = "center",
    INSIDE = "inside",
    left = "left",
    OUTSIDE = "outside",
    RIGHT = "right"
}
export interface ImageRelativeOptions {
    horizontalRelativeFrom: ImageHorizontalRelativeFrom;
    horizontalPosition: ImageRelativePosition;
    verticalRelativeFrom: ImageVerticalRelativeFrom;
    verticalPosition: ImageRelativePosition;
}
export interface Image {
    fileName: string;
    title?: string;
    description?: string;
    buffer?: Buffer;
    url?: string;
    widthInCm: number;
    heightInCm: number;
    position?: ImagePosition;
    relativePositionOptions?: ImageRelativeOptions;
    isBackground?: boolean;
}
declare const _default: (i: Image, fileIndex: FileIndex[], sourceName: string) => string;
export default _default;
