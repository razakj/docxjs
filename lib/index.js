"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jszip_1 = __importDefault(require("jszip"));
const contenttypes_1 = __importDefault(require("./package/contenttypes"));
const docProps_1 = __importDefault(require("./package/docProps"));
const _rels_1 = __importDefault(require("./package/_rels"));
const word_1 = __importDefault(require("./package/word"));
const files_1 = __importDefault(require("./files"));
const tools_1 = require("./tools");
var PACKAGE;
(function (PACKAGE) {
    PACKAGE["contentTypes"] = "[Content_Types].xml";
    PACKAGE["app"] = "docProps/app.xml";
    PACKAGE["core"] = "docProps/core.xml";
    PACKAGE["globalRels"] = "_rels/.rels";
    PACKAGE["document"] = "word/document.xml";
    PACKAGE["fontTable"] = "word/fontTable.xml";
    PACKAGE["settings"] = "word/settings.xml";
    PACKAGE["styles"] = "word/styles.xml";
    PACKAGE["webSettings"] = "word/webSettings.xml";
    PACKAGE["docRels"] = "word/_rels/document.xml.rels";
    PACKAGE["vbaRels"] = "word/_rels/vbaProject.bin.rels";
    PACKAGE["vbaData"] = "word/vbaData.xml";
    PACKAGE["htmlDoc"] = "word/htmlDoc.html";
    PACKAGE["header"] = "word/defaultHeader.xml";
    PACKAGE["headerRels"] = "word/_rels/defaultHeader.xml.rels";
    PACKAGE["footer"] = "word/defaultFooter.xml";
    PACKAGE["footerRels"] = "word/_rels/defaultFooter.xml.rels";
    PACKAGE["firstPageHeader"] = "word/firstPageHeader.xml";
    PACKAGE["firstPageHeaderRels"] = "word/_rels/firstPageHeader.xml.rels";
    PACKAGE["firstPageFooter"] = "word/firstPageFooter.xml";
    PACKAGE["firstPageFooterRels"] = "word/_rels/firstPageFooter.xml.rels";
    PACKAGE["imageBasePath"] = "word/media";
})(PACKAGE || (PACKAGE = {}));
var FileIndexType;
(function (FileIndexType) {
    FileIndexType["AFCHUNK"] = "aFChunk";
    FileIndexType["IMAGE"] = "image";
    FileIndexType["VBA"] = "vbaProject";
})(FileIndexType = exports.FileIndexType || (exports.FileIndexType = {}));
const getContent = async (options) => {
    const jsZip = new jszip_1.default();
    const { docPropsOptions, ...documentOptions } = options;
    const contentOptions = {
        hasDefaultHeader: !!documentOptions.defaultHeader,
        hasDefaultFooter: !!documentOptions.defaultFooter,
        hasFirstPageHeader: !!documentOptions.firstPageHeader,
        hasFirstPageFooter: !!documentOptions.firstPageFooter,
        hasVba: documentOptions.vba
            && (typeof documentOptions.vba.bin === "string" || documentOptions.vba.bin instanceof Buffer)
    };
    let fileIndex = [];
    const docProps = docProps_1.default(docPropsOptions);
    const contentTypes = contenttypes_1.default(contentOptions);
    const globalRels = _rels_1.default();
    const word = word_1.default(documentOptions, contentOptions, fileIndex);
    jsZip
        .file(PACKAGE.contentTypes, tools_1.normalizeFileContent(contentTypes))
        .file(PACKAGE.app, tools_1.normalizeFileContent(docProps.app))
        .file(PACKAGE.core, tools_1.normalizeFileContent(docProps.core))
        .file(PACKAGE.globalRels, tools_1.normalizeFileContent(globalRels))
        .file(PACKAGE.document, tools_1.normalizeFileContent(word.document))
        .file(PACKAGE.fontTable, tools_1.normalizeFileContent(word.fontTable))
        .file(PACKAGE.settings, tools_1.normalizeFileContent(word.settings))
        .file(PACKAGE.styles, tools_1.normalizeFileContent(word.styles))
        .file(PACKAGE.webSettings, tools_1.normalizeFileContent(word.webSettings))
        .file(PACKAGE.docRels, tools_1.normalizeFileContent(word.docRels));
    if (contentOptions.hasDefaultHeader) {
        jsZip.file(PACKAGE.header, tools_1.normalizeFileContent(word.defaultHeader));
        jsZip.file(PACKAGE.headerRels, tools_1.normalizeFileContent(word.defaultHeaderRels));
    }
    if (contentOptions.hasDefaultFooter) {
        jsZip.file(PACKAGE.footer, tools_1.normalizeFileContent(word.defaultFooter));
        jsZip.file(PACKAGE.footerRels, tools_1.normalizeFileContent(word.defaultFooterRels));
    }
    if (contentOptions.hasFirstPageHeader) {
        jsZip.file(PACKAGE.firstPageHeader, tools_1.normalizeFileContent(word.firstPageHeader));
        jsZip.file(PACKAGE.firstPageHeaderRels, tools_1.normalizeFileContent(word.firstPageHeaderRels));
    }
    if (contentOptions.hasFirstPageFooter) {
        jsZip.file(PACKAGE.firstPageFooter, tools_1.normalizeFileContent(word.firstPageFooter));
        jsZip.file(PACKAGE.firstPageFooterRels, tools_1.normalizeFileContent(word.firstPageFooterRels));
    }
    if (contentOptions.hasVba) {
        jsZip.file(PACKAGE.vbaRels, tools_1.normalizeFileContent(word.vbaRels));
        jsZip.file(PACKAGE.vbaData, tools_1.normalizeFileContent(word.vbaData));
    }
    await files_1.default({
        jsZip, fileIndex,
        htmlDocumentModifier: options.htmlDocumentModifier
    });
    return jsZip;
};
const asBuffer = async (options) => {
    const jsZip = await getContent(options);
    return jsZip.generateAsync({
        type: "nodebuffer"
    });
};
exports.asBuffer = asBuffer;
const asStream = async (options) => {
    const jsZip = await getContent(options);
    return jsZip.generateNodeStream();
};
exports.asStream = asStream;
const toFile = async (options) => {
    const fileStream = fs_1.default.createWriteStream(path_1.default.resolve(options.filePath), { flags: 'w' });
    const docxBuffer = await asBuffer(options);
    return new Promise((resolve, reject) => {
        fileStream.write(docxBuffer, err => {
            if (err)
                return reject(err);
            return resolve();
        });
    });
};
exports.toFile = toFile;
