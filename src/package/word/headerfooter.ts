import {PageNumberPosition, PageNumberProperties} from "./parts/pagenumber";
import getDocumentContent, {DocumentBody} from "./parts/content";

import pageNumber from './parts/pagenumber';
import {FileIndex} from "../../index";

export enum HeaderFooterType {
    HEADER  = "hdr",
    FOOTER  = "ftr"
}

export interface HeaderFooterProperties {
    body                : DocumentBody[],
    pageNumber?         : PageNumberProperties
}

export interface HeaderFooter {
    hf          : HeaderFooterProperties,
    type        : HeaderFooterType,
    fileIndex   : FileIndex[],
    sourceName  : string
}

export default (headerOrFooter: HeaderFooter): string => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:${headerOrFooter.type} mc:Ignorable="w14 w15 w16se wp14"
    xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" 
    xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" 
    xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" 
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
    xmlns:o="urn:schemas-microsoft-com:office:office" 
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" 
    xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" 
    xmlns:v="urn:schemas-microsoft-com:vml" 
    xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" 
    xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" 
    xmlns:w10="urn:schemas-microsoft-com:office:word" 
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" 
    xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" 
    xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" 
    xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" 
    xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" 
    xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" 
    xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
>
    ${headerOrFooter.hf.pageNumber && headerOrFooter.hf.pageNumber.position === PageNumberPosition.TOP ? pageNumber(headerOrFooter.hf.pageNumber) : ''}
    ${headerOrFooter.hf.body.map(body => getDocumentContent(body, headerOrFooter.fileIndex, headerOrFooter.sourceName)).join('')}
    ${headerOrFooter.hf.pageNumber && headerOrFooter.hf.pageNumber.position === PageNumberPosition.BOTTOM ? pageNumber(headerOrFooter.hf.pageNumber) : ''}
</w:${headerOrFooter.type}>
`)