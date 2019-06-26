"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const index_1 = require("../../../index");
const jsdom_1 = __importDefault(require("jsdom"));
const { JSDOM } = jsdom_1.default;
exports.default = (html) => {
    const id = `html_${html.fileIndex.length + 1}`;
    html.fileIndex.push({
        id,
        sourceName: html.sourceName,
        type: index_1.FileIndexType.AFCHUNK,
        fullPath: `word/${id}.html`,
        content: async ({ htmlDocumentModifier }) => {
            let htmlString = '';
            if (html.url) {
                const f = await node_fetch_1.default(html.url);
                htmlString = await f.text();
            }
            else {
                htmlString = html.html;
            }
            const { document } = new JSDOM(htmlString).window;
            if (typeof htmlDocumentModifier === "function")
                htmlDocumentModifier(document);
            return Buffer.from(document.documentElement.outerHTML);
        }
    });
    return (`<w:altChunk r:id="${id}" />`);
};
