import fs                               from 'fs';
import path                             from 'path';
import JSZip                            from 'jszip';
import getContentTypes                  from './package/contenttypes';
import getDocProps, {DocPropsOptions}   from './package/docProps';
import getGlobalRels                    from './package/_rels';
import getWord, {WordProps}             from './package/word';

import {normalizeFileContent}           from "./tools";

enum PACKAGE {
    contentTypes        = '[Content_Types].xml',
    app                 = 'docProps/app.xml',
    core                = 'docProps/core.xml',
    globalRels          = '_rels/.rels',
    document            = 'word/document.xml',
    fontTable           = 'word/fontTable.xml',
    settings            = 'word/settings.xml',
    styles              = 'word/styles.xml',
    webSettings         = 'word/webSettings.xml',
    docRels             = 'word/_rels/document.xml.rels',
    htmlDoc             = 'word/htmlDoc.html',
    header              = 'word/defaultHeader.xml',
    headerRels          = 'word/_rels/defaultHeader.xml.rels',
    footer              = 'word/defaultFooter.xml',
    footerRels          = 'word/_rels/defaultFooter.xml.rels',
    firstPageHeader     = 'word/firstPageHeader.xml',
    firstPageHeaderRels = 'word/_rels/firstPageHeader.xml.rels',
    firstPageFooter     = 'word/firstPageFooter.xml',
    firstPageFooterRels = 'word/_rels/firstPageFooter.xml.rels',
    imageBasePath       = 'word/media'
}

export interface FileHtmlDocxOptions extends HtmlDocxOptions {
    filePath            : string
}

export interface HtmlDocxOptions extends WordProps {
    htmlContent?            : string,
    docPropsOptions?        : DocPropsOptions
}

const getContent = (options: HtmlDocxOptions): JSZip => {
    const jsZip = new JSZip();

    const {htmlContent, docPropsOptions, ...documentOptions} = options;

    const contentOptions       = {
        hasHtmlContent              : !!htmlContent,
        hasDefaultHeader            : !!documentOptions.defaultHeader,
        hasDefaultFooter            : !!documentOptions.defaultFooter,
        hasFirstPageHeader          : !!documentOptions.firstPageHeader,
        hasFirstPageFooter          : !!documentOptions.firstPageFooter
    };

    let imageIndex          = [];

    const docProps          = getDocProps(docPropsOptions);
    const contentTypes      = getContentTypes(contentOptions);
    const globalRels        = getGlobalRels();
    const word              = getWord(documentOptions, contentOptions, imageIndex);

    jsZip
        .file(PACKAGE.contentTypes, normalizeFileContent(contentTypes))
        .file(PACKAGE.app, normalizeFileContent(docProps.app))
        .file(PACKAGE.core, normalizeFileContent(docProps.core))
        .file(PACKAGE.globalRels, normalizeFileContent(globalRels))
        .file(PACKAGE.document, normalizeFileContent(word.document))
        .file(PACKAGE.fontTable, normalizeFileContent(word.fontTable))
        .file(PACKAGE.settings, normalizeFileContent(word.settings))
        .file(PACKAGE.styles, normalizeFileContent(word.styles))
        .file(PACKAGE.webSettings, normalizeFileContent(word.webSettings))
        .file(PACKAGE.docRels, normalizeFileContent(word.docRels));

    if(contentOptions.hasHtmlContent) jsZip.file(PACKAGE.htmlDoc, normalizeFileContent(htmlContent));
    if(contentOptions.hasDefaultHeader) {
        jsZip.file(PACKAGE.header, normalizeFileContent(word.defaultHeader));
        jsZip.file(PACKAGE.headerRels, normalizeFileContent(word.defaultHeaderRels));
    }
    if(contentOptions.hasDefaultFooter) {
        jsZip.file(PACKAGE.footer, normalizeFileContent(word.defaultFooter));
        jsZip.file(PACKAGE.footerRels, normalizeFileContent(word.defaultFooterRels));
    }
    if(contentOptions.hasFirstPageHeader) {
        jsZip.file(PACKAGE.firstPageHeader, normalizeFileContent(word.firstPageHeader));
        jsZip.file(PACKAGE.firstPageHeaderRels, normalizeFileContent(word.firstPageHeaderRels));
    }
    if(contentOptions.hasFirstPageFooter) {
        jsZip.file(PACKAGE.firstPageFooter, normalizeFileContent(word.firstPageFooter));
        jsZip.file(PACKAGE.firstPageFooterRels, normalizeFileContent(word.firstPageFooterRels));
    }

    imageIndex.forEach(image => {
        jsZip.file(`${PACKAGE.imageBasePath}/${image.fileName}`, image.buffer);
    });

    return jsZip;
};

const asBuffer = async (options: HtmlDocxOptions): Promise<Buffer> => {
    return getContent(options).generateAsync<"nodebuffer">({
        type: "nodebuffer"
    });
};

const asStream = (options: HtmlDocxOptions): NodeJS.ReadableStream => {
    return getContent(options).generateNodeStream();
};

const toFile = async (options: FileHtmlDocxOptions): Promise<void> => {

    const fileStream    = fs.createWriteStream(path.resolve(options.filePath), {flags: 'w'});
    const docxBuffer    = await asBuffer(options);

    return new Promise((resolve, reject) => {
        fileStream.write(docxBuffer, err => {
            if(err) return reject(err);

            return resolve()
        });
    })
};

export  {
    asBuffer, asStream, toFile
}