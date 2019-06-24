import { StylesProperties } from "../styles";
import { Text } from './text';
import { Image, ImageIndex } from './image';
export declare enum ParagraphContentType {
    TEXT = "text",
    IMAGE = "image"
}
export interface ParagraphContent {
    type: ParagraphContentType;
    data: Text | Image;
}
export interface Paragraph {
    content?: ParagraphContent | ParagraphContent[];
    styleId?: keyof StylesProperties;
}
declare const _default: (p: Paragraph, imageIndex: ImageIndex[], sourceName: string) => string;
export default _default;
