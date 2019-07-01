import { AppProperties } from './app';
import { CoreProperties } from './core';
export interface DocPropsOptions {
    coreOptions?: CoreProperties;
    appProperties: AppProperties;
}
export interface DocProps {
    app: string;
    core: string;
}
declare const _default: (docPropsOptions?: DocPropsOptions) => DocProps;
export default _default;
