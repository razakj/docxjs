import {notEmpty} from "../../../../tools";

export interface Font {
    ascii               : string,
    hAnsi               : string,
    cs                  : string,
    eastAsia            : string
}

const font = notEmpty((f: Font) => (`
<w:rFonts 
    ${notEmpty(ascii => `w:ascii="${ascii}"`)(f.ascii)}
    ${notEmpty(hAnsi => `w:hAnsi="${hAnsi}"`)(f.hAnsi)}
    ${notEmpty(cs => `w:cs="${cs}"`)(f.cs)}
    ${notEmpty(eastAsia => `w:eastAsia="${eastAsia}"`)(f.eastAsia)}
/>
`));

export default font;