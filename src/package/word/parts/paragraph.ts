import {StylesProperties}           from "../styles";
import getText, {Text}              from './text';
import getImage, {Image, ImageIndex} from './image'

export enum ParagraphContentType {
    TEXT    = "text",
    IMAGE   = "image"
}

export interface ParagraphContent {
    type                : ParagraphContentType,
    data                : Text | Image
}

export interface Paragraph {
    content?            : ParagraphContent | ParagraphContent[]
    styleId?            : keyof StylesProperties
}

const paragraphContentMap = {
    text    : getText,
    image   : getImage
};

const getContentTypeFunction    = (type: ParagraphContentType) => type && paragraphContentMap.hasOwnProperty(type) ? paragraphContentMap[type] : getText;
const getContentTypeData        = (content: ParagraphContent): any  => content.data ? content.data : (typeof content === "string" ? content : "");

export default (p: Paragraph, imageIndex: ImageIndex[], sourceName: string): string => (`
<w:p>
    <w:pPr>
        ${p.styleId ? `<w:pStyle w:val="${p.styleId}"/>` : ''}
    </w:pPr>
    ${Array.isArray(p.content) ? p.content.map(c => getContentTypeFunction(c.type)(getContentTypeData(c), imageIndex, sourceName)) : (p.content ? getContentTypeFunction(p.content.type)(getContentTypeData(p.content), imageIndex, sourceName) : '')}
</w:p>
`)