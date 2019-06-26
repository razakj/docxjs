import {boolean, notEmpty} from "../../../../tools";
import font, {Font} from "./font";

export interface Underline {
    type                : string,
    color?              : string
}


export interface TextStyle {
    color?              : string,
    bold?               : boolean,
    italic?             : boolean,
    upperCase?          : boolean,
    lowerCase?          : boolean,
    strike?             : boolean,
    doubleStrike?       : boolean,
    emboss?             : boolean,
    imprint?            : boolean,
    outline?            : boolean,
    shadow?             : boolean,
    fontSize?           : number,
    underLine?          : Underline,
    font?               : Font
}

const textStylesMap = {
    color               : notEmpty(val => `<w:color w:val="${val}"/>`),
    bold                : boolean('<w:b />'),
    italic              : boolean('<w:i />'),
    upperCase           : boolean('<w:caps w:val="1" />'),
    lowerCase           : boolean('<w:smallCaps w:val="1" />'),
    strike              : boolean('<w:strike w:val="1" />'),
    doubleStrike        : boolean('<w:dstrike w:val="1" />'),
    emboss              : boolean('<w:emboss w:val="1" />'),
    imprint             : boolean('<w:emboss w:val="1" />'),
    outline             : boolean('<w:outline w:val="1" />'),
    shadow              : boolean('<w:shadow w:val="1" />'),
    fontSize            : notEmpty(val => `<w:sz w:val="${val}"/>`),
    font                : font,
    underLine           : notEmpty((val: Underline) => `<w:u w:val="${val.type}" ${notEmpty(color => `w:color=${color}`)}/>`)
};

export {
    textStylesMap
}