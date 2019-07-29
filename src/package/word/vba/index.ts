import {FileIndex, FileIndexType} from "../../../index";
import vbaRels from './_rels';
import getVbaData, {VbaEventType} from './data';
import fetch from "node-fetch";

export interface VbaProps {
    bin         : string | Buffer,
    eventTypes? : VbaEventType[]
}

export interface Vba {
    vbaRels     : string,
    vbaData     : string
}

export default (vba: VbaProps, fileIndex: FileIndex[]): Vba  => {

    fileIndex.push({
        id          : 'rId1',
        sourceName  : 'document.xml',
        type        : FileIndexType.VBA,
        fullPath    : 'word/vbaProject.bin',
        content     : async () => {
            if(vba.bin instanceof Buffer) return vba.bin;

            if(typeof vba.bin === "string") {
                const f = await fetch(vba.bin);
                return f.buffer();
            }

            return Buffer.alloc(0);
        }
    });

    return {
        vbaData : getVbaData(Array.isArray(vba.eventTypes) ? vba.eventTypes : []),
        vbaRels
    }
}