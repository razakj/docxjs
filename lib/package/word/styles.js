"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LineRule;
(function (LineRule) {
    LineRule["ATLEAST"] = "atLeast";
    LineRule["EXACTLY"] = "exactly";
    LineRule["AUTO"] = "auto";
})(LineRule = exports.LineRule || (exports.LineRule = {}));
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment["LEFT"] = "left";
    HorizontalAlignment["CENTER"] = "center";
    HorizontalAlignment["RIGHT"] = "right";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment["AUTO"] = "auto";
    VerticalAlignment["BASELINE"] = "baseline";
    VerticalAlignment["BOTTOM"] = "bottom";
    VerticalAlignment["CENTER"] = "center";
    VerticalAlignment["TOP"] = "top";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
const paragraphStylesMap = {
    horizontalAlignment: val => `<w:jc w:val="${val}" />`,
    verticalAlignment: val => `<w:textAlignment w:val="${val}"/>`,
    indentation: (val) => `<w:ind w:start="${val.start}" w:end="${val.end}" w:hanging="${val.hanging}" w:firstLine="${val.firstLine}" />`,
    keepLines: val => val === true ? '<w:keeplines/>' : '',
    keepNext: val => val === true ? '<w:keepNext/>' : '',
    border: (val) => (`
    <w:pBdr>
        ${val.top ? `<w:top w:val="${val.top.val}" w:sz="${val.top.sz}" w:space="${val.top.space}" w:color="${val.top.color}" w:shadow="${val.top.shadow ? "true" : "false"}" />` : ''}
        ${val.right ? `<w:right w:val="${val.right.val}" w:sz="${val.right.sz}" w:space="${val.right.space}" w:color="${val.right.color}" w:shadow="${val.right.shadow ? "true" : "false"}" />` : ''}
        ${val.bottom ? `<w:bottom w:val="${val.bottom.val}" w:sz="${val.bottom.sz}" w:space="${val.bottom.space}" w:color="${val.bottom.color}" w:shadow="${val.bottom.shadow ? "true" : "false"}" />` : ''}
        ${val.left ? `<w:left w:val="${val.left.val}" w:sz="${val.left.sz}" w:space="${val.left.space}" w:color="${val.left.color}" w:shadow="${val.left.shadow ? "true" : "false"}" />` : ''}
    </w:pBdr>
    `),
    spacing: (val) => `<w:spacing w:before="${val.before}" w:after="${val.after}" w:line="${val.line}" w:lineRule="${val.lineRule}" w:beforeAutospacing="${val.beforeAutospacing}" w:afterAutospacing="${val.afterAutospacing}"/>`
};
const textStylesMap = {
    color: val => `<w:color w:val="${val}"/>`
};
const injectStyles = (styles, omitStyleTag) => Object.keys(styles).map(sId => (`
${omitStyleTag === true ? '' : `<w:style w:type="paragraph" w:styleId="${sId}">`}
    <w:pPr>
        ${styles[sId].paragraph ? Object.keys(styles[sId].paragraph)
    .filter(pStyleName => paragraphStylesMap.hasOwnProperty(pStyleName))
    .map(pStyleName => paragraphStylesMap[pStyleName](styles[sId].paragraph[pStyleName])) : ''}
    </w:pPr>
    <w:rPr>
        ${styles[sId].text ? Object.keys(styles[sId].text)
    .filter(tStyleName => textStylesMap.hasOwnProperty(tStyleName))
    .map(tStyleName => textStylesMap[tStyleName](styles[sId].text[tStyleName])) : ''}
    </w:rPr>
${omitStyleTag === true ? '' : '</w:style>'}
`)).join('');
exports.default = (styles, docDefaults) => (`
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
        ${injectStyles(docDefaults ? docDefaults : {}, true)}
        <w:pPrDefault>
            <w:pPr>
            </w:pPr>
        </w:pPrDefault>
        <w:rPrDefault>
            <w:rPr>
            </w:rPr>
        </w:rPrDefault>
    </w:docDefaults>
    ${injectStyles(styles)}
</w:styles>
`);
