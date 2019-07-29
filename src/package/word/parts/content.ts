import getParagraph, {Paragraph} from "./paragraph";
import getHtml      from './html';
import {FileIndex} from "../../../index";
import getToc, {TableOfContents} from "./toc";

export interface DocumentBody {
    html?               : string,
    url?                : string,
    paragraph?          : Paragraph,
    toc?                : TableOfContents
}

export default (documentBody: DocumentBody, fileIndex: FileIndex[], sourceName: string): string => {
    if(documentBody.html || documentBody.url) {
        return getHtml({
            url     : documentBody.url,
            html    : documentBody.html,
            fileIndex,
            sourceName
        });
    } else if(documentBody.paragraph) {
        return getParagraph(documentBody.paragraph, fileIndex, sourceName);
    } else if(documentBody.toc) {
        return getToc(documentBody.toc);
    } else {
        return '';
    }
};