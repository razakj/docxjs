export enum PageNumberPosition {
    TOP         = "top",
    BOTTOM      = "bottom"
}

export interface PageNumberProperties {
    styleId?    : string,
    label       : string,
    position    : PageNumberPosition
}

export default (pageNumber: PageNumberProperties): string => (`
<w:p>
    ${pageNumber.styleId ? (`
        <w:pPr>
            <w:pStyle w:val="${pageNumber.styleId}"/>
        </w:pPr>
    `) : ''}
    <w:r>
        <w:fldChar w:fldCharType="begin"/>
    </w:r>
    <w:r>
        <w:instrText xml:space="preserve"> PAGE \\* MERGEFORMAT </w:instrText>
    </w:r>
    <w:r>
        <w:fldChar w:fldCharType="end"/>
    </w:r>
</w:p>
`)