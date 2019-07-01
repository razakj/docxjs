"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../../tools");
const border_1 = __importDefault(require("./border"));
const spacing_1 = __importDefault(require("./spacing"));
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment["LEFT"] = "left";
    HorizontalAlignment["CENTER"] = "center";
    HorizontalAlignment["RIGHT"] = "right";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment["AUTO"] = "auto";
    VerticalAlignment["BASELINE"] = "baseline";
    VerticalAlignment["BOTTOM"] = "bottom";
    VerticalAlignment["CENTER"] = "center";
    VerticalAlignment["TOP"] = "top";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
const paragraphStylesMap = {
    horizontalAlignment: tools_1.notEmpty(val => `<w:jc w:val="${val}" />`),
    verticalAlignment: tools_1.notEmpty(val => `<w:textAlignment w:val="${val}"/>`),
    indentation: tools_1.notEmpty((val) => `<w:ind w:start="${val.start}" w:end="${val.end}" w:hanging="${val.hanging}" w:firstLine="${val.firstLine}" />`),
    keepLines: tools_1.boolean('<w:keeplines/>'),
    keepNext: tools_1.boolean('<w:keepNext/>'),
    border: border_1.default,
    spacing: spacing_1.default
};
exports.paragraphStylesMap = paragraphStylesMap;
