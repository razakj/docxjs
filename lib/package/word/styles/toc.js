"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tocLevels = (name, indent) => (`
<w:style w:type="paragraph" w:styleId="${name}">
    <w:name w:val="${name}"/>
    <w:basedOn w:val="Normal"/>
    <w:next w:val="Normal"/>
    <w:autoRedefine/>
    <w:uiPriority w:val="39"/>
    <w:unhideWhenUsed/>
    <w:pPr>
        <w:spacing w:after="100"/>
        ${indent ? `<w:ind w:left="${indent}"/>` : ''}
    </w:pPr>
</w:style>
`);
exports.default = `
${tocLevels('__TOC_LEVEL1', 0)}
${tocLevels('__TOC_LEVEL2', 220)}
${tocLevels('__TOC_LEVEL3', 440)}
${tocLevels('__TOC_LEVEL4', 660)}
${tocLevels('__TOC_LEVEL5', 880)}
<w:style w:type="character" w:styleId="__TOC_HYPERLINK">
    <w:name w:val="__HYPERLINK"/>
    <w:basedOn w:val="DefaultParagraphFont"/>
    <w:uiPriority w:val="99"/>
    <w:unhideWhenUsed/>
    <w:rPr>
        <w:color w:val="0563C1" w:themeColor="hyperlink"/>
        <w:u w:val="single"/>
    </w:rPr>
</w:style>
`;
