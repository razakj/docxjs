import fetch                            from 'node-fetch';
import {FileIndex, FileIndexType}       from "../../../index";

import jsdom from 'jsdom';
const {JSDOM} = jsdom;

export interface Html {
    html?       : string,
    url?        : string,
    fileIndex   : FileIndex[],
    sourceName  : string
}

export default (html: Html): string => {

    const id                    = `html_${html.fileIndex.length + 1}`;

    html.fileIndex.push({
        id,
        sourceName  : html.sourceName,
        type        : FileIndexType.AFCHUNK,
        fullPath    : `word/${id}.html`,
        content     : async ({htmlDocumentModifier}) => {

            let htmlString = '';

            if(html.url) {
                const f         = await fetch(html.url);
                htmlString      = await f.text();
            } else {
                htmlString      = html.html;
            }

            const {document}            = new JSDOM(htmlString).window;

            if(typeof htmlDocumentModifier === "function") htmlDocumentModifier(document);

            return Buffer.from(document.documentElement.outerHTML);

        }
    });

    return (`<w:altChunk r:id="${id}" />`)
}