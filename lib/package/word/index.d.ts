import { DocumentProperties } from "./document";
import { FontTableProperties } from "./fonttable";
import { SettingsProperties } from "./settings";
import { StylesProperties } from "./styles";
import { WebSettingsProperties } from "./websettings";
import { HeaderFooterProperties } from './headerfooter';
import { ContentOptions } from "../contenttypes";
import { FileIndex } from "../../index";
import { DocumentBody } from "./parts/content";
export interface Word {
    document: string;
    fontTable: string;
    settings: string;
    styles: string;
    webSettings: string;
    docRels: string;
    defaultHeader: string;
    defaultHeaderRels: string;
    defaultFooter: string;
    defaultFooterRels: string;
    firstPageHeader: string;
    firstPageHeaderRels: string;
    firstPageFooter: string;
    firstPageFooterRels: string;
}
export interface WordProps {
    body: DocumentBody[];
    documentProperties?: DocumentProperties;
    settingsProperties?: SettingsProperties;
    styles?: StylesProperties;
    docDefaults?: StylesProperties;
    webSettingsProperties?: WebSettingsProperties;
    fontTableProperties?: FontTableProperties;
    defaultHeader?: HeaderFooterProperties;
    defaultFooter?: HeaderFooterProperties;
    firstPageHeader?: HeaderFooterProperties;
    firstPageFooter?: HeaderFooterProperties;
}
declare const _default: (wordProps: WordProps, contentOptions: ContentOptions, fileIndex: FileIndex[]) => Word;
export default _default;
