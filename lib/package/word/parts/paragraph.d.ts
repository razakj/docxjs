import { StylesProperties } from "../styles";
import { Text } from './text';
import { Image } from './image';
import { FileIndex } from "../../../index";
export declare enum ParagraphContentType {
    TEXT = "text",
    IMAGE = "image"
}
export interface ParagraphContentObject {
    type: ParagraphContentType;
    data: Text | Image;
}
export declare type ParagraphContent = ParagraphContentObject | string;
export interface ParagraphProps {
    content?: ParagraphContent | ParagraphContent[];
    styleId?: keyof StylesProperties;
}
export declare type Paragraph = ParagraphProps | string;
declare const _default: (p: Paragraph, fileIndex: FileIndex[], sourceName: string) => string;
export default _default;
