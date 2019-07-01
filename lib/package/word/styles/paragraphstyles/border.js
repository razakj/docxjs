"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../../tools");
const getBorderProps = (borderLine) => (`
${tools_1.notEmpty(val => `w:val=${val}`)(borderLine.val)}
${tools_1.notEmpty(sz => `w:sz=${sz}`)(borderLine.sz)}
${tools_1.notEmpty(space => `w:space=${space}`)(borderLine.space)}
${tools_1.notEmpty(color => `w:color=${color}`)(borderLine.color)}
${tools_1.boolean('w:shadow="true"')(borderLine.shadow)}
`);
exports.default = tools_1.notEmpty((b) => (`
<w:pBdr>
    ${b.top ? `<w:top ${getBorderProps(b.top)} />` : ''}
    ${b.right ? `<w:right ${getBorderProps(b.right)}/>` : ''}
    ${b.bottom ? `<w:bottom ${getBorderProps(b.bottom)} />` : ''}
    ${b.left ? `<w:left ${getBorderProps(b.left)} />` : ''}
</w:pBdr>
`));
