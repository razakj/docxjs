import { StylesProperties } from "../styles";
export interface Chapter {
    referencePoint: string;
    label: string;
    chapters?: Chapter[];
}
export interface TableOfContents {
    styleId?: keyof StylesProperties;
    chapters: Chapter[];
}
declare const _default: (toc: TableOfContents) => string;
export default _default;
