export declare enum PageNumberPosition {
    TOP = "top",
    BOTTOM = "bottom"
}
export interface PageNumberProperties {
    styleId?: string;
    label: string;
    position: PageNumberPosition;
}
declare const _default: (pageNumber: PageNumberProperties) => string;
export default _default;
