import { ParagraphBorder } from "./border";
import { ParagraphSpacing } from "./spacing";
export declare enum HorizontalAlignment {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}
export declare enum VerticalAlignment {
    AUTO = "auto",
    BASELINE = "baseline",
    BOTTOM = "bottom",
    CENTER = "center",
    TOP = "top"
}
export interface ParagraphIndentation {
    start: number;
    end: number;
    hanging: number;
    firstLine: number;
}
export interface ParagraphStyle {
    horizontalAlignment?: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    indentation?: ParagraphIndentation;
    keepLines?: boolean;
    keepNext?: boolean;
    border?: ParagraphBorder;
    spacing?: ParagraphSpacing;
}
declare const paragraphStylesMap: {
    horizontalAlignment: Function;
    verticalAlignment: Function;
    indentation: Function;
    keepLines: Function;
    keepNext: Function;
    border: Function;
    spacing: Function;
};
export { paragraphStylesMap };
