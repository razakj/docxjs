const normalizeFileContent  = (input: string): string => {
    return input
        .replace(/(\r\n|\n|\r|\t)/gm,"")
        .replace(/(\s\s+)/gm, " ");
};

const cmToTwips             = (cm: number, defaultCm?: number): number => {
    return (cm !== null && cm !== undefined ? cm : (defaultCm ? defaultCm : 0)) * 566.9291;
};

const cmToEmu               = (cm: number, defaultCm?: number): number => {
    return (cm !== null && cm !== undefined ? cm : (defaultCm ? defaultCm : 0)) * 360000;
};

const boolean       = (xmlString    : string): Function => val => val === true ? xmlString : '';
const notEmpty      = (xmlFce       : Function): Function => val => val !== null && val !== undefined ? xmlFce(val) : '';

export {
    normalizeFileContent, cmToTwips, cmToEmu, boolean, notEmpty
}