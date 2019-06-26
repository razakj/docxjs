import {notEmpty} from "../../../../tools";

export enum LineRule {
    ATLEAST = "atLeast",
    EXACTLY = "exactly",
    AUTO    = "auto"
}

export interface ParagraphSpacing {
    before?             : number,
    after?              : number,
    beforeAutospacing?  : number,
    afterAutospacing?   : number
    line?               : number,
    lineRule?           : LineRule
}


export default notEmpty((s: ParagraphSpacing) => (`
<w:spacing 
    ${notEmpty(before => `w:before="${before}"`)(s.before)} 
    ${notEmpty(after => `w:after="${after}"`)(s.after)} 
    ${notEmpty(line => `w:line="${line}"`)(s.line)}
    ${notEmpty(lineRule => `w:lineRule="${lineRule}"`)(s.lineRule)}
    ${notEmpty(beforeAutospacing => `w:beforeAutospacing="${beforeAutospacing}"`)(s.beforeAutospacing)}
    ${notEmpty(afterAutospacing => `w:afterAutospacing="${afterAutospacing}"`)(s.afterAutospacing)}
/>
`));