"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("./text"));
const image_1 = __importDefault(require("./image"));
var ParagraphContentType;
(function (ParagraphContentType) {
    ParagraphContentType["TEXT"] = "text";
    ParagraphContentType["IMAGE"] = "image";
})(ParagraphContentType = exports.ParagraphContentType || (exports.ParagraphContentType = {}));
const paragraphContentMap = {
    text: text_1.default,
    image: image_1.default
};
const getContentTypeFunction = (type) => type && paragraphContentMap.hasOwnProperty(type) ? paragraphContentMap[type] : text_1.default;
const getContentTypeData = (content) => content.data ? content.data : (typeof content === "string" ? content : "");
exports.default = (p, imageIndex, sourceName) => (`
<w:p>
    <w:pPr>
        ${p.styleId ? `<w:pStyle w:val="${p.styleId}"/>` : ''}
    </w:pPr>
    ${Array.isArray(p.content) ? p.content.map(c => getContentTypeFunction(c.type)(getContentTypeData(c), imageIndex, sourceName)) : (p.content ? getContentTypeFunction(p.content.type)(getContentTypeData(p.content), imageIndex, sourceName) : '')}
</w:p>
`);
