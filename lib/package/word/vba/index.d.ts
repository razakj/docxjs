/// <reference types="node" />
import { FileIndex } from "../../../index";
import { VbaEventType } from './data';
export interface VbaProps {
    bin: string | Buffer;
    eventTypes?: VbaEventType[];
}
export interface Vba {
    vbaRels: string;
    vbaData: string;
}
declare const _default: (vba: VbaProps, fileIndex: FileIndex[]) => Vba;
export default _default;
