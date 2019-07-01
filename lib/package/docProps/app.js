"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appProperties) => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties 
    xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" 
    xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
>
    <Application>${appProperties.application}</Application>
    <LinksUpToDate>false</LinksUpToDate>
    <SharedDoc>false</SharedDoc>
    <HyperlinksChanged>false</HyperlinksChanged>
    <AppVersion>16.0000</AppVersion>
</Properties>
`);
