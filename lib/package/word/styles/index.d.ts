import { ParagraphStyle } from "./paragraphstyles";
import { TextStyle } from "./textstyles";
export declare enum StyleType {
    PARAGRAPH = "paragraph",
    CHARACTER = "character",
    NUMBERING = "numbering",
    TABLE = "table"
}
export interface StylesProperties {
    [styleId: string]: {
        type?: StyleType;
        name?: string;
        hidden?: boolean;
        aliases?: string[];
        paragraph?: ParagraphStyle;
        text?: TextStyle;
    };
}
declare const _default: (s: StylesProperties, docDefaults?: StylesProperties) => string;
export default _default;
