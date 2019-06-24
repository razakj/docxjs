const normalizeFileContent  = (input: string): string => {
    return input.replace(/(\r\n|\n|\r|\t)/gm,"");
};

const cmToTwips             = (cm: number, defaultCm?: number): number => {
    return (cm !== null && cm !== undefined ? cm : (defaultCm ? defaultCm : 0)) * 566.9291;
};

const cmToEmu               = (cm: number, defaultCm?: number): number => {
    return (cm !== null && cm !== undefined ? cm : (defaultCm ? defaultCm : 0)) * 360000;
};


export {
    normalizeFileContent, cmToTwips, cmToEmu
}