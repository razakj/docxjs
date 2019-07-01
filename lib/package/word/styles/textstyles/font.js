"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../../tools");
const font = tools_1.notEmpty((f) => (`
<w:rFonts 
    ${tools_1.notEmpty(ascii => `w:ascii="${ascii}"`)(f.ascii)}
    ${tools_1.notEmpty(hAnsi => `w:hAnsi="${hAnsi}"`)(f.hAnsi)}
    ${tools_1.notEmpty(cs => `w:cs="${cs}"`)(f.cs)}
    ${tools_1.notEmpty(eastAsia => `w:eastAsia="${eastAsia}"`)(f.eastAsia)}
/>
`));
exports.default = font;
