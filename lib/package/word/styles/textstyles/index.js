"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../../tools");
const font_1 = __importDefault(require("./font"));
const textStylesMap = {
    color: tools_1.notEmpty(val => `<w:color w:val="${val}"/>`),
    bold: tools_1.boolean('<w:b />'),
    italic: tools_1.boolean('<w:i />'),
    upperCase: tools_1.boolean('<w:caps w:val="1" />'),
    lowerCase: tools_1.boolean('<w:smallCaps w:val="1" />'),
    strike: tools_1.boolean('<w:strike w:val="1" />'),
    doubleStrike: tools_1.boolean('<w:dstrike w:val="1" />'),
    emboss: tools_1.boolean('<w:emboss w:val="1" />'),
    imprint: tools_1.boolean('<w:emboss w:val="1" />'),
    outline: tools_1.boolean('<w:outline w:val="1" />'),
    shadow: tools_1.boolean('<w:shadow w:val="1" />'),
    fontSize: tools_1.notEmpty(val => `<w:sz w:val="${val}"/>`),
    font: font_1.default,
    underLine: tools_1.notEmpty((val) => `<w:u w:val="${val.type}" ${tools_1.notEmpty(color => `w:color=${color}`)}/>`)
};
exports.textStylesMap = textStylesMap;
