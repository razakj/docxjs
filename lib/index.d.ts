/// <reference types="node" />
import { DocPropsOptions } from './package/docProps';
import { WordProps } from './package/word';
export declare type HtmlDocumentModifier = (document: Document) => void;
export interface FileHtmlDocxOptions extends HtmlDocxOptions {
    filePath: string;
}
export interface HtmlDocxOptions extends WordProps {
    docPropsOptions?: DocPropsOptions;
    htmlDocumentModifier?: HtmlDocumentModifier;
}
export declare enum FileIndexType {
    AFCHUNK = "aFChunk",
    IMAGE = "image",
    VBA = "vbaProject"
}
export interface FileContentFunctionInput {
    htmlDocumentModifier?: HtmlDocumentModifier;
}
declare type FileContentFunction = (input: FileContentFunctionInput) => Promise<Buffer>;
export interface FileIndex {
    id: string;
    fullPath: string;
    type: FileIndexType;
    sourceName: string;
    content?: Buffer | FileContentFunction;
}
declare const asBuffer: (options: HtmlDocxOptions) => Promise<Buffer>;
declare const asStream: (options: HtmlDocxOptions) => Promise<NodeJS.ReadableStream>;
declare const toFile: (options: FileHtmlDocxOptions) => Promise<void>;
export { asBuffer, asStream, toFile };
