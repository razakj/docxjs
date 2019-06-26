import {boolean, notEmpty} from "../../../../tools";

export interface ParagraphBorderProps {
    color?      : string,
    shadow?     : boolean,
    space?      : number,
    sz?         : number,
    val?        : string
}

export interface ParagraphBorder {
    top?        : ParagraphBorderProps,
    right?      : ParagraphBorderProps,
    bottom?     : ParagraphBorderProps,
    left?       : ParagraphBorderProps
}

const getBorderProps = (borderLine: ParagraphBorderProps) => (`
${notEmpty(val => `w:val=${val}`)(borderLine.val)}
${notEmpty(sz => `w:sz=${sz}`)(borderLine.sz)}
${notEmpty(space => `w:space=${space}`)(borderLine.space)}
${notEmpty(color => `w:color=${color}`)(borderLine.color)}
${boolean('w:shadow="true"')(borderLine.shadow)}
`);

export default notEmpty((b: ParagraphBorder) => (`
<w:pBdr>
    ${b.top     ? `<w:top ${getBorderProps(b.top)} />` : ''}
    ${b.right   ? `<w:right ${getBorderProps(b.right)}/>` : ''}
    ${b.bottom  ? `<w:bottom ${getBorderProps(b.bottom)} />` : ''}
    ${b.left    ? `<w:left ${getBorderProps(b.left)} />` : ''}
</w:pBdr>
`));