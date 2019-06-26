import {FileIndex, HtmlDocumentModifier} from "./index";
import JSZip        from "jszip";

export interface Files {
    jsZip                   : JSZip,
    fileIndex               : FileIndex[],
    htmlDocumentModifier?   : HtmlDocumentModifier
}

export default (options: Files): Promise<void[]> => {

    const { fileIndex, jsZip, htmlDocumentModifier} = options;

    let fileContentFunctionInput = {
        htmlDocumentModifier
    };

    return Promise.all(fileIndex.map(async file => {
        try {
            let content = Buffer.alloc(0);

            if(typeof file.content === "function") {
                content     = await file.content(fileContentFunctionInput);
            } else if(file.content instanceof Buffer) {
                content = file.content;
            }

            jsZip.file(file.fullPath, content);
        } catch(err) {
            console.warn(`Unable to handle ${file.fullPath} - ${err.message}`);
        }
    }))
}