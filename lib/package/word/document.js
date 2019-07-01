"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../tools");
const content_1 = __importDefault(require("./parts/content"));
var DocumentOrientation;
(function (DocumentOrientation) {
    DocumentOrientation["PORTRAIT"] = "portrait";
    DocumentOrientation["LANDSCAPE"] = "landscape";
})(DocumentOrientation = exports.DocumentOrientation || (exports.DocumentOrientation = {}));
exports.default = (documentBody, documentProperties, contentOptions, fileIndex) => (`
<?xml version="1.0" encoding="ISO-8859-1"?>
<w:document mc:Ignorable="w14 w15 w16se wp14" 
    xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" 
    xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" 
    xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" 
    xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" 
    xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" 
    xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" 
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" 
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
    xmlns:w10="urn:schemas-microsoft-com:office:word" 
    xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" 
    xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" 
    xmlns:v="urn:schemas-microsoft-com:vml" 
    xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" 
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" 
    xmlns:o="urn:schemas-microsoft-com:office:office" 
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
    xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" 
    xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" 
    xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
>
<w:body>
    ${documentBody.map(body => content_1.default(body, fileIndex, 'document.xml')).join('')}
    <w:sectPr>
        <w:pgNumType />
        ${contentOptions.hasFirstPageHeader || contentOptions.hasFirstPageFooter ? '<w:titlePg />' : ''}
        ${contentOptions.hasFirstPageHeader ?
    '<w:headerReference w:type="first" r:id="firstPageHeader"/>' : ''}
        ${contentOptions.hasFirstPageFooter ?
    '<w:footerReference w:type="first" r:id="firstPageFooter"/>' : ''}
        ${contentOptions.hasDefaultHeader ?
    '<w:headerReference w:type="default" r:id="defaultHeader"/>' : ''}
        ${contentOptions.hasDefaultFooter ?
    '<w:footerReference w:type="default" r:id="defaultFooter"/>' : ''}
        <w:pgSz 
            w:w="${tools_1.cmToTwips(documentProperties.pageWidthInCm, 21)}" 
            w:h="${tools_1.cmToTwips(documentProperties.pageHeightInCm, 29.7)}" 
            w:orient="${documentProperties.orientation ? documentProperties.orientation : DocumentOrientation.PORTRAIT}" 
        />
        <w:pgMar w:top="${tools_1.cmToTwips(documentProperties.marginTopInCm, 2.54)}"
            w:right="${tools_1.cmToTwips(documentProperties.marginRightInCm, 2.54)}"
            w:bottom="${tools_1.cmToTwips(documentProperties.marginBottomInCm, 2.54)}"
            w:left="${tools_1.cmToTwips(documentProperties.marginLeftInCm, 2.54)}"
            w:header="${tools_1.cmToTwips(documentProperties.headerFromTopInCm, 1.27)}"
            w:footer="${tools_1.cmToTwips(documentProperties.footerFromBottomInCm, 1.27)}"
            w:gutter="${tools_1.cmToTwips(documentProperties.gutterInCm, 0)}"
      />
    </w:sectPr>
</w:body>
</w:document>
`);
