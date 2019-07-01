import { Font } from "./font";
export interface Underline {
    type: string;
    color?: string;
}
export interface TextStyle {
    color?: string;
    bold?: boolean;
    italic?: boolean;
    upperCase?: boolean;
    lowerCase?: boolean;
    strike?: boolean;
    doubleStrike?: boolean;
    emboss?: boolean;
    imprint?: boolean;
    outline?: boolean;
    shadow?: boolean;
    fontSize?: number;
    underLine?: Underline;
    font?: Font;
}
declare const textStylesMap: {
    color: Function;
    bold: Function;
    italic: Function;
    upperCase: Function;
    lowerCase: Function;
    strike: Function;
    doubleStrike: Function;
    emboss: Function;
    imprint: Function;
    outline: Function;
    shadow: Function;
    fontSize: Function;
    font: Function;
    underLine: Function;
};
export { textStylesMap };
