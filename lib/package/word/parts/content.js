"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paragraph_1 = __importDefault(require("./paragraph"));
const html_1 = __importDefault(require("./html"));
exports.default = (documentBody, fileIndex, sourceName) => {
    if (documentBody.html || documentBody.url) {
        return html_1.default({
            url: documentBody.url,
            html: documentBody.html,
            fileIndex,
            sourceName
        });
    }
    else if (documentBody.paragraph) {
        return paragraph_1.default(documentBody.paragraph, fileIndex, sourceName);
    }
    else {
        return '';
    }
};
