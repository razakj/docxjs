export declare enum PageNumberVerticalPosition {
    ABOVE = "above",
    BELOW = "below"
}
export interface PageNumberProperties {
    styleId?: string;
    label: string;
    verticalPosition: PageNumberVerticalPosition;
}
declare const _default: (pageNumber: PageNumberProperties) => string;
export default _default;
