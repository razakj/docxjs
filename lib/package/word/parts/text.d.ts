import { StylesProperties } from "../styles";
export interface TextProps {
    text: string;
    styleId?: keyof StylesProperties;
}
export declare type Text = TextProps | string;
declare const _default: (t: Text) => string;
export default _default;
