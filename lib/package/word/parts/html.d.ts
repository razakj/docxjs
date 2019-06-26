import { FileIndex } from "../../../index";
export interface Html {
    html?: string;
    url?: string;
    fileIndex: FileIndex[];
    sourceName: string;
}
declare const _default: (html: Html) => string;
export default _default;
