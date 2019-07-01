"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../../tools");
var LineRule;
(function (LineRule) {
    LineRule["ATLEAST"] = "atLeast";
    LineRule["EXACTLY"] = "exactly";
    LineRule["AUTO"] = "auto";
})(LineRule = exports.LineRule || (exports.LineRule = {}));
exports.default = tools_1.notEmpty((s) => (`
<w:spacing 
    ${tools_1.notEmpty(before => `w:before="${before}"`)(s.before)} 
    ${tools_1.notEmpty(after => `w:after="${after}"`)(s.after)} 
    ${tools_1.notEmpty(line => `w:line="${line}"`)(s.line)}
    ${tools_1.notEmpty(lineRule => `w:lineRule="${lineRule}"`)(s.lineRule)}
    ${tools_1.notEmpty(beforeAutospacing => `w:beforeAutospacing="${beforeAutospacing}"`)(s.beforeAutospacing)}
    ${tools_1.notEmpty(afterAutospacing => `w:afterAutospacing="${afterAutospacing}"`)(s.afterAutospacing)}
/>
`));
