/// <reference types="node" />
export declare enum ImagePosition {
    INLINE = "inline",
    ABSOLUTE = "absolute"
}
export interface ImageAbsoluteOptions {
}
export interface Image {
    fileName: string;
    title?: string;
    description?: string;
    buffer: Buffer;
    widthInCm: number;
    heightInCm: number;
    position?: ImagePosition;
    absoluteOptions: ImageAbsoluteOptions;
}
export interface ImageIndex {
    id: number;
    fileName: string;
    buffer: Buffer;
    sourceName: string;
}
declare const _default: (i: Image, imageIndex: ImageIndex[], sourceName: string) => string;
export default _default;
