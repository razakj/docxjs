"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paragraphstyles_1 = require("./paragraphstyles");
const textstyles_1 = require("./textstyles");
const toc_1 = __importDefault(require("./toc"));
var StyleType;
(function (StyleType) {
    StyleType["PARAGRAPH"] = "paragraph";
    StyleType["CHARACTER"] = "character";
    StyleType["NUMBERING"] = "numbering";
    StyleType["TABLE"] = "table";
})(StyleType = exports.StyleType || (exports.StyleType = {}));
const injectParagraphStyle = (pStyle) => (`
<w:pPr>
    ${pStyle ? Object.keys(pStyle)
    .filter(pStyleName => paragraphstyles_1.paragraphStylesMap.hasOwnProperty(pStyleName))
    .map(pStyleName => paragraphstyles_1.paragraphStylesMap[pStyleName](pStyle[pStyleName])).join('') : ''}
</w:pPr>
`);
const injectTextStyle = (tStyle) => (`
<w:rPr>
    ${tStyle ? Object.keys(tStyle)
    .filter(tStyleName => textstyles_1.textStylesMap.hasOwnProperty(tStyleName))
    .map(tStyleName => textstyles_1.textStylesMap[tStyleName](tStyle[tStyleName])).join('') : ''}
</w:rPr>
`);
exports.default = (s, docDefaults) => {
    let paragraphDefaultStyles = null;
    let textDefaultStyles = null;
    if (docDefaults && Object.keys(docDefaults).length > 0) {
        const defaultKey = Object.keys(docDefaults)[0];
        if (docDefaults[defaultKey].paragraph)
            paragraphDefaultStyles = docDefaults[defaultKey].paragraph;
        if (docDefaults[defaultKey].text)
            textDefaultStyles = docDefaults[defaultKey].text;
    }
    return (`
<?xml version="1.0" encoding="ISO-8859-1"?>
<w:styles mc:Ignorable="w14 w15 w16se" 
    xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" 
    xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" 
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" 
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" 
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
>
    <w:docDefaults>
        <w:pPrDefault>
            ${paragraphDefaultStyles ? injectParagraphStyle(paragraphDefaultStyles) : ''}
        </w:pPrDefault>
        <w:rPrDefault>
            ${textDefaultStyles ? injectTextStyle(textDefaultStyles) : ''}
        </w:rPrDefault>
    </w:docDefaults>
    ${Object.keys(s).map(styleId => (`
        <w:style w:type="${s[styleId].type ? s[styleId].type : StyleType.PARAGRAPH}" w:styleId="${styleId}">
            ${s[styleId].name ? `<w:name w:val="${s[styleId].name}"/>` : ''}
            ${Array.isArray(s[styleId].aliases) ? `<w:aliases w:val="${s[styleId].aliases.join(',')}"/>` : ''}
            ${s[styleId].hidden === true ? '<w:hidden/>' : ''}
            ${s[styleId].paragraph ? injectParagraphStyle(s[styleId].paragraph) : ''}
            ${s[styleId].text ? injectTextStyle(s[styleId].text) : ''}
        </w:style>
    `))}
    ${toc_1.default}
</w:styles>
    `);
};
