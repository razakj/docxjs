import {ParagraphStyle, paragraphStylesMap} from "./paragraphstyles";
import {TextStyle, textStylesMap} from "./textstyles";

export enum StyleType {
    PARAGRAPH   = "paragraph",
    CHARACTER   = "character",
    NUMBERING   = "numbering",
    TABLE       = "table"
}

export interface StylesProperties {
    [styleId: string]   : {
        type?           : StyleType,
        name?           : string,
        hidden?         : boolean,
        aliases?        : string[],
        paragraph?      : ParagraphStyle,
        text?           : TextStyle
    }
}

const injectParagraphStyle = (pStyle: ParagraphStyle): string => (`
<w:pPr>
    ${pStyle ? Object.keys(pStyle)
        .filter(pStyleName => paragraphStylesMap.hasOwnProperty(pStyleName))
        .map(pStyleName => paragraphStylesMap[pStyleName](pStyle[pStyleName])).join('') : ''}
</w:pPr>
`);

const injectTextStyle = (tStyle: TextStyle): string => (`
<w:rPr>
    ${tStyle ? Object.keys(tStyle)
                .filter(tStyleName => textStylesMap.hasOwnProperty(tStyleName))
                .map(tStyleName => textStylesMap[tStyleName](tStyle[tStyleName])).join('') : ''}
</w:rPr>
`);

export default (s: StylesProperties,docDefaults?: StylesProperties): string => {

    let paragraphDefaultStyles  = null;
    let textDefaultStyles       = null;

    if(docDefaults && Object.keys(docDefaults).length > 0) {
        const defaultKey = Object.keys(docDefaults)[0];

        if(docDefaults[defaultKey].paragraph)   paragraphDefaultStyles  = docDefaults[defaultKey].paragraph;
        if(docDefaults[defaultKey].text)        textDefaultStyles       = docDefaults[defaultKey].text;
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
            ${s[styleId].text      ? injectTextStyle(s[styleId].text) : ''}
        </w:style>
    `))}
</w:styles>
    `)
}