"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const core_1 = __importDefault(require("./core"));
exports.default = (docPropsOptions) => {
    return {
        app: app_1.default(docPropsOptions && docPropsOptions.appProperties ? docPropsOptions.appProperties : {}),
        core: core_1.default(docPropsOptions && docPropsOptions.coreOptions ? docPropsOptions.coreOptions : {})
    };
};
