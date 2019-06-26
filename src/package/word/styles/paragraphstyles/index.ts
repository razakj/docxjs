import {boolean, notEmpty} from "../../../../tools";
import border, {ParagraphBorder} from "./border";
import spacing, {ParagraphSpacing} from "./spacing";

export enum HorizontalAlignment {
    LEFT    = "left",
    CENTER  = "center",
    RIGHT   = "right"
}

export enum VerticalAlignment {
    AUTO        = "auto",
    BASELINE    = "baseline",
    BOTTOM      = "bottom",
    CENTER      = "center",
    TOP         = "top"

}

export interface ParagraphIndentation {
    start       : number,
    end         : number,
    hanging     : number,
    firstLine   : number
}

export interface ParagraphStyle {
    horizontalAlignment?    : HorizontalAlignment,
    verticalAlignment       : VerticalAlignment,
    indentation?            : ParagraphIndentation,
    keepLines?              : boolean,
    keepNext?               : boolean,
    border?                 : ParagraphBorder,
    spacing?                : ParagraphSpacing
}

const paragraphStylesMap = {
    horizontalAlignment : notEmpty(val => `<w:jc w:val="${val}" />`),
    verticalAlignment   : notEmpty(val => `<w:textAlignment w:val="${val}"/>`),
    indentation         : notEmpty((val: ParagraphIndentation) => `<w:ind w:start="${val.start}" w:end="${val.end}" w:hanging="${val.hanging}" w:firstLine="${val.firstLine}" />`),
    keepLines           : boolean('<w:keeplines/>'),
    keepNext            : boolean('<w:keepNext/>'),
    border              : border,
    spacing             : spacing
};

export {paragraphStylesMap}