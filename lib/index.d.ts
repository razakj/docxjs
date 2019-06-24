/// <reference types="node" />
import { DocPropsOptions } from './package/docProps';
import { WordProps } from './package/word';
export interface FileHtmlDocxOptions extends HtmlDocxOptions {
    filePath: string;
}
export interface HtmlDocxOptions extends WordProps {
    htmlContent?: string;
    docPropsOptions?: DocPropsOptions;
}
declare const asBuffer: (options: HtmlDocxOptions) => Promise<Buffer>;
declare const asStream: (options: HtmlDocxOptions) => NodeJS.ReadableStream;
declare const toFile: (options: FileHtmlDocxOptions) => Promise<void>;
export { asBuffer, asStream, toFile };
