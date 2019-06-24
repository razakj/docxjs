import moment from 'moment';

export interface CoreProperties {
    title?          : string,
    subject?        : string,
    creator?        : string,
    keyword?        : string[],
    description?    : string,
    revisionNo?     : number
}

export default (coreOptions: CoreProperties): string => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties 
    xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" 
    xmlns:dc="http://purl.org/dc/elements/1.1/" 
    xmlns:dcterms="http://purl.org/dc/terms/" 
    xmlns:dcmitype="http://purl.org/dc/dcmitype/" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>
    <dc:title>${coreOptions.title ? coreOptions.title : ""}</dc:title>
    <dc:subject>${coreOptions.subject ? coreOptions.subject : ""}</dc:subject>
    <dc:creator>${coreOptions.creator ? coreOptions.creator : ""}</dc:creator>
    <cp:keywords>${Array.isArray(coreOptions.keyword) ? coreOptions.keyword.join(',') : ""}</cp:keywords>
    <dc:description>${coreOptions.description ? coreOptions.description : ""}</dc:description>
    <cp:lastModifiedBy>${coreOptions.creator ? coreOptions.creator : ""}</cp:lastModifiedBy>
    <cp:revision>${coreOptions.revisionNo ? coreOptions.revisionNo : ""}</cp:revision>
    <dcterms:created xsi:type="dcterms:W3CDTF">${moment().utc().format()}</dcterms:created>
    <dcterms:modified xsi:type="dcterms:W3CDTF">${moment().utc().format()}</dcterms:modified>
</cp:coreProperties>
`)