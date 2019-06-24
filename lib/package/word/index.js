"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = __importDefault(require("./document"));
const fonttable_1 = __importDefault(require("./fonttable"));
const settings_1 = __importDefault(require("./settings"));
const styles_1 = __importDefault(require("./styles"));
const websettings_1 = __importDefault(require("./websettings"));
const _rels_1 = __importDefault(require("./_rels"));
const headerfooter_1 = __importStar(require("./headerfooter"));
const _rels_headerfooter_1 = __importDefault(require("./_rels-headerfooter"));
exports.default = (wordProps, contentOptions, imageIndex) => {
    const document = document_1.default(wordProps.documentProperties ? wordProps.documentProperties : {}, contentOptions);
    const headers = {
        defaultHeader: contentOptions.hasDefaultHeader ? headerfooter_1.default({
            hf: wordProps.defaultHeader ? wordProps.defaultHeader : {},
            type: headerfooter_1.HeaderFooterType.HEADER,
            imageIndex: imageIndex,
            sourceName: 'defaultHeader.xml'
        }) : '',
        defaultFooter: contentOptions.hasDefaultFooter ? headerfooter_1.default({
            hf: wordProps.defaultFooter ? wordProps.defaultFooter : {},
            type: headerfooter_1.HeaderFooterType.FOOTER,
            imageIndex: imageIndex,
            sourceName: 'defaultFooter.xml'
        }) : '',
        firstPageHeader: contentOptions.hasFirstPageHeader ? headerfooter_1.default({
            hf: wordProps.firstPageHeader ? wordProps.firstPageHeader : {},
            type: headerfooter_1.HeaderFooterType.HEADER,
            imageIndex: imageIndex,
            sourceName: 'firstPageHeader.xml'
        }) : '',
        firstPageFooter: contentOptions.hasFirstPageFooter ? headerfooter_1.default({
            hf: wordProps.firstPageFooter ? wordProps.firstPageFooter : {},
            type: headerfooter_1.HeaderFooterType.FOOTER,
            imageIndex: imageIndex,
            sourceName: 'firstPageFooter.xml'
        }) : '',
    };
    return {
        document,
        fontTable: fonttable_1.default(wordProps.fontTableProperties ? wordProps.fontTableProperties : {}),
        settings: settings_1.default(wordProps.settingsProperties ? wordProps.settingsProperties : {}),
        styles: styles_1.default(wordProps.styles ? wordProps.styles : {}, wordProps.docDefaults),
        webSettings: websettings_1.default(wordProps.webSettingsProperties ? wordProps.webSettingsProperties : {}),
        docRels: _rels_1.default(contentOptions, imageIndex.filter(i => i.sourceName === 'document.xml')),
        ...headers,
        defaultHeaderRels: _rels_headerfooter_1.default(imageIndex.filter(i => i.sourceName === 'defaultHeader.xml')),
        defaultFooterRels: _rels_headerfooter_1.default(imageIndex.filter(i => i.sourceName === 'defaultFooter.xml')),
        firstPageHeaderRels: _rels_headerfooter_1.default(imageIndex.filter(i => i.sourceName === 'firstPageHeader.xml')),
        firstPageFooterRels: _rels_headerfooter_1.default(imageIndex.filter(i => i.sourceName === 'firstPageFooter.xml')),
    };
};
