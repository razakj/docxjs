"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../index");
const _rels_1 = __importDefault(require("./_rels"));
const data_1 = __importDefault(require("./data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.default = (vba, fileIndex) => {
    fileIndex.push({
        id: 'rId1',
        sourceName: 'document.xml',
        type: index_1.FileIndexType.VBA,
        fullPath: 'word/vbaProject.bin',
        content: async () => {
            if (vba.bin instanceof Buffer)
                return vba.bin;
            if (typeof vba.bin === "string") {
                const f = await node_fetch_1.default(vba.bin);
                return f.buffer();
            }
            return Buffer.alloc(0);
        }
    });
    return {
        vbaData: data_1.default(Array.isArray(vba.eventTypes) ? vba.eventTypes : []),
        vbaRels: _rels_1.default
    };
};
