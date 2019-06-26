declare const normalizeFileContent: (input: string) => string;
declare const cmToTwips: (cm: number, defaultCm?: number) => number;
declare const cmToEmu: (cm: number, defaultCm?: number) => number;
declare const boolean: (xmlString: string) => Function;
declare const notEmpty: (xmlFce: Function) => Function;
export { normalizeFileContent, cmToTwips, cmToEmu, boolean, notEmpty };
