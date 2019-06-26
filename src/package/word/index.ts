import getDocument, {DocumentProperties} from "./document";
import getFontTable, {FontTableProperties} from "./fonttable";
import getSettings, {SettingsProperties} from "./settings";
import getStyles, {StylesProperties} from "./styles";
import getWebSettings, {WebSettingsProperties} from "./websettings";
import getDocRels from "./_rels";
import getHeaderOrFooter, {HeaderFooterProperties, HeaderFooterType} from './headerfooter';
import getReaderOrFooterRels from './_rels-headerfooter';

import {ContentOptions} from "../contenttypes";
import {FileIndex} from "../../index";
import {DocumentBody} from "./parts/content";

export interface Word {
    document            : string,
    fontTable           : string,
    settings            : string,
    styles              : string,
    webSettings         : string,
    docRels             : string,
    defaultHeader       : string,
    defaultHeaderRels   : string,
    defaultFooter       : string,
    defaultFooterRels   : string,
    firstPageHeader     : string,
    firstPageHeaderRels : string,
    firstPageFooter     : string,
    firstPageFooterRels : string
}

export interface WordProps {
    body                    : DocumentBody[],
    documentProperties?     : DocumentProperties,
    settingsProperties?     : SettingsProperties,
    styles?                 : StylesProperties,
    docDefaults?            : StylesProperties,
    webSettingsProperties?  : WebSettingsProperties,
    fontTableProperties?    : FontTableProperties,
    defaultHeader?          : HeaderFooterProperties,
    defaultFooter?          : HeaderFooterProperties,
    firstPageHeader?        : HeaderFooterProperties,
    firstPageFooter?        : HeaderFooterProperties
}


export default (wordProps: WordProps, contentOptions: ContentOptions, fileIndex: FileIndex[]): Word => {

    const document      = getDocument(
        wordProps.body,
        wordProps.documentProperties ? wordProps.documentProperties : {} as DocumentProperties,
        contentOptions,
        fileIndex
    );
    const headers       = {
        defaultHeader   : contentOptions.hasDefaultHeader   ? getHeaderOrFooter({
            hf          : wordProps.defaultHeader ? wordProps.defaultHeader : {} as HeaderFooterProperties,
            type        : HeaderFooterType.HEADER,
            fileIndex   : fileIndex,
            sourceName  : 'defaultHeader.xml'
        }) : '',
        defaultFooter   : contentOptions.hasDefaultFooter   ? getHeaderOrFooter({
            hf          : wordProps.defaultFooter ? wordProps.defaultFooter : {} as HeaderFooterProperties,
            type        : HeaderFooterType.FOOTER,
            fileIndex   : fileIndex,
            sourceName  : 'defaultFooter.xml'
        }) : '',
        firstPageHeader : contentOptions.hasFirstPageHeader ? getHeaderOrFooter({
            hf          : wordProps.firstPageHeader ? wordProps.firstPageHeader : {} as HeaderFooterProperties,
            type        : HeaderFooterType.HEADER,
            fileIndex   : fileIndex,
            sourceName  : 'firstPageHeader.xml'
        }) : '',
        firstPageFooter : contentOptions.hasFirstPageFooter ? getHeaderOrFooter({
            hf          : wordProps.firstPageFooter ? wordProps.firstPageFooter : {} as HeaderFooterProperties,
            type        : HeaderFooterType.FOOTER,
            fileIndex   : fileIndex,
            sourceName  : 'firstPageFooter.xml'
        }) : '',
    };

    return {
        document,
        fontTable           : getFontTable(wordProps.fontTableProperties ? wordProps.fontTableProperties : {} as FontTableProperties),
        settings            : getSettings(wordProps.settingsProperties ? wordProps.settingsProperties : {} as SettingsProperties),
        styles              : getStyles(wordProps.styles ? wordProps.styles : {} as StylesProperties, wordProps.docDefaults),
        webSettings         : getWebSettings(wordProps.webSettingsProperties ? wordProps.webSettingsProperties : {} as WebSettingsProperties),
        docRels             : getDocRels(contentOptions, fileIndex.filter(i => i.sourceName === 'document.xml')),
        ...headers,
        defaultHeaderRels   : getReaderOrFooterRels(fileIndex.filter(i => i.sourceName === 'defaultHeader.xml')),
        defaultFooterRels   : getReaderOrFooterRels(fileIndex.filter(i => i.sourceName === 'defaultFooter.xml')),
        firstPageHeaderRels : getReaderOrFooterRels(fileIndex.filter(i => i.sourceName === 'firstPageHeader.xml')),
        firstPageFooterRels : getReaderOrFooterRels(fileIndex.filter(i => i.sourceName === 'firstPageFooter.xml')),
    }
};