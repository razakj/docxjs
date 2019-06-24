export declare enum LineRule {
    ATLEAST = "atLeast",
    EXACTLY = "exactly",
    AUTO = "auto"
}
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
export interface ParagraphBorderProps {
    color?: string;
    shadow?: boolean;
    space?: number;
    sz?: number;
    val?: string;
}
export interface ParagraphBorder {
    top?: ParagraphBorderProps;
    right?: ParagraphBorderProps;
    bottom?: ParagraphBorderProps;
    left?: ParagraphBorderProps;
}
export interface ParagraphSpacing {
    before?: number;
    after?: number;
    beforeAutospacing?: number;
    afterAutospacing?: number;
    line?: number;
    lineRule?: LineRule;
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
export interface TextStyle {
    color?: string;
}
export interface StylesProperties {
    [styleId: string]: {
        paragraph: ParagraphStyle;
        text: TextStyle;
    };
}
declare const _default: (styles: StylesProperties, docDefaults?: StylesProperties) => string;
export default _default;
