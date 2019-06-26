import getParagraph, {Paragraph} from "./paragraph";
import getHtml      from './html';
import {FileIndex} from "../../../index";

export interface DocumentBody {
    html?               : string,
    url?                : string,
    paragraph?          : Paragraph
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
    } else {
        return '';
    }
};