"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("./text"));
const image_1 = __importDefault(require("./image"));
const toc_1 = __importDefault(require("./toc"));
var ParagraphContentType;
(function (ParagraphContentType) {
    ParagraphContentType["TEXT"] = "text";
    ParagraphContentType["IMAGE"] = "image";
    ParagraphContentType["TOC"] = "toc";
})(ParagraphContentType = exports.ParagraphContentType || (exports.ParagraphContentType = {}));
const paragraphContentMap = {
    text: text_1.default,
    image: image_1.default,
    toc: toc_1.default
};
const getContentTypeFunction = (c) => typeof c === "object" && paragraphContentMap.hasOwnProperty(c.type) ? paragraphContentMap[c.type] : text_1.default;
exports.default = (p, fileIndex, sourceName) => {
    if (typeof p === "string") {
        return `<w:p>${text_1.default(p)}</w:p>`;
    }
    else if (typeof p === "object" && typeof p.content === "string") {
        return `<w:p>${text_1.default(p.content)}</w:p>`;
    }
    else if (typeof p === "object" && typeof p.content === "object") {
        const content = Array.isArray(p.content) ? p.content : (p.content ? [p.content] : []);
        return (`
        <w:p>
            <w:pPr>
                ${p.styleId ? `<w:pStyle w:val="${p.styleId}"/>` : ''}
            </w:pPr>
            ${content.map(c => getContentTypeFunction(c)(typeof c === "object" ? c.data : c, fileIndex, sourceName)).join('')}
        </w:p>
        `);
    }
    else {
        return "";
    }
};
