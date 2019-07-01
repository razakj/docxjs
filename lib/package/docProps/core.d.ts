export interface CoreProperties {
    title?: string;
    subject?: string;
    creator?: string;
    keyword?: string[];
    description?: string;
    revisionNo?: number;
}
declare const _default: (coreOptions: CoreProperties) => string;
export default _default;
