"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizeFileContent = (input) => {
    return input
        .replace(/(\r\n|\n|\r|\t)/gm, "")
        .replace(/(\s\s+)/gm, " ");
};
exports.normalizeFileContent = normalizeFileContent;
const cmToTwips = (cm, defaultCm) => {
    return (cm !== null && cm !== undefined ? cm : (defaultCm ? defaultCm : 0)) * 566.9291;
};
exports.cmToTwips = cmToTwips;
const cmToEmu = (cm, defaultCm) => {
    return (cm !== null && cm !== undefined ? cm : (defaultCm ? defaultCm : 0)) * 360000;
};
exports.cmToEmu = cmToEmu;
const boolean = (xmlString) => val => val === true ? xmlString : '';
exports.boolean = boolean;
const notEmpty = (xmlFce) => val => val !== null && val !== undefined ? xmlFce(val) : '';
exports.notEmpty = notEmpty;
