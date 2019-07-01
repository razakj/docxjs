"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (options) => {
    const { fileIndex, jsZip, htmlDocumentModifier } = options;
    let fileContentFunctionInput = {
        htmlDocumentModifier
    };
    return Promise.all(fileIndex.map(async (file) => {
        try {
            let content = Buffer.alloc(0);
            if (typeof file.content === "function") {
                content = await file.content(fileContentFunctionInput);
            }
            else if (file.content instanceof Buffer) {
                content = file.content;
            }
            jsZip.file(file.fullPath, content);
        }
        catch (err) {
            console.warn(`Unable to handle ${file.fullPath} - ${err.message}`);
        }
    }));
};
