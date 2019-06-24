"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (settingsOptions) => (`
<?xml version="1.0" encoding="ISO-8859-1"?>
<w:settings mc:Ignorable="w14 w15 w16se" 
    xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main" 
    xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" 
    xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" 
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" 
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
    xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:v="urn:schemas-microsoft-com:vml" 
    xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" 
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" 
    xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
>
    <w:zoom w:percent="${settingsOptions.zoom ? settingsOptions.zoom : 200}"/>
    <w:proofState w:grammar="clean" w:spelling="clean"/>
    <w:defaultTabStop w:val="${settingsOptions.defaultTabStop ? settingsOptions.defaultTabStop : 100}"/>
</w:settings>
`);
