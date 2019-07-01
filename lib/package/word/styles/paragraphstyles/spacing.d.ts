export declare enum LineRule {
    ATLEAST = "atLeast",
    EXACTLY = "exactly",
    AUTO = "auto"
}
export interface ParagraphSpacing {
    before?: number;
    after?: number;
    beforeAutospacing?: number;
    afterAutospacing?: number;
    line?: number;
    lineRule?: LineRule;
}
declare const _default: Function;
export default _default;
