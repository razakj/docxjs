import {StylesProperties}           from "../styles";
import getText, {Text}              from './text';
import getImage, {Image}            from './image';
import getToc, {TableOfContents}    from './toc';
import {FileIndex} from "../../../index";

export enum ParagraphContentType {
    TEXT    = "text",
    IMAGE   = "image",
    TOC     = "toc"
}

export interface ParagraphContentObject {
    type                : ParagraphContentType,
    data                : Text | Image
}

export type ParagraphContent = ParagraphContentObject | string

export interface ParagraphProps {
    content?            : ParagraphContent | ParagraphContent[]
    styleId?            : keyof StylesProperties
}

export type Paragraph = ParagraphProps | string;

const paragraphContentMap = {
    text    : getText,
    image   : getImage,
    toc     : getToc
};

const getContentTypeFunction    = (c: ParagraphContent) => typeof c === "object" && paragraphContentMap.hasOwnProperty(c.type) ? paragraphContentMap[c.type] : getText;

export default (p: Paragraph, fileIndex: FileIndex[], sourceName: string): string => {

    if(typeof p === "string") {
        return `<w:p>${getText(p)}</w:p>`;
    } else if(typeof p === "object" && typeof p.content === "string") {
        return `<w:p>${getText(p.content)}</w:p>`;
    } else if(typeof p === "object" && typeof p.content === "object") {

        const content           = Array.isArray(p.content) ? p.content : (p.content ? [p.content] : []);

        return (`
        <w:p>
            <w:pPr>
                ${p.styleId ? `<w:pStyle w:val="${p.styleId}"/>` : ''}
            </w:pPr>
            ${content.map(c => getContentTypeFunction(c)(typeof c === "object" ? c.data : c as any, fileIndex, sourceName)).join('')}
        </w:p>
        `)

    } else {
        return "";
    }


}