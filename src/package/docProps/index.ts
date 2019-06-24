import getApp, {AppProperties} from './app';
import getCore, {CoreProperties} from './core';

export interface DocPropsOptions {
    coreOptions?    : CoreProperties,
    appProperties   : AppProperties
}

export interface DocProps {
    app     : string,
    core    : string
}

export default (docPropsOptions?: DocPropsOptions): DocProps => {
    return {
        app             : getApp(docPropsOptions && docPropsOptions.appProperties ? docPropsOptions.appProperties : {} as AppProperties),
        core            : getCore(docPropsOptions && docPropsOptions.coreOptions ? docPropsOptions.coreOptions : {} as CoreProperties)
    }
}