"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageNumberVerticalPosition;
(function (PageNumberVerticalPosition) {
    PageNumberVerticalPosition["ABOVE"] = "above";
    PageNumberVerticalPosition["BELOW"] = "below";
})(PageNumberVerticalPosition = exports.PageNumberVerticalPosition || (exports.PageNumberVerticalPosition = {}));
exports.default = (pageNumber) => (`
<w:p>
    ${pageNumber.styleId ? (`
        <w:pPr>
            <w:pStyle w:val="${pageNumber.styleId}"/>
        </w:pPr>
    `) : ''}
    <w:r>
        <w:t xml:space="preserve">${pageNumber.label}</w:t>
    </w:r>
    <w:r>
        <w:fldChar w:fldCharType="begin"/>
    </w:r>
    <w:r>
        <w:instrText xml:space="preserve">PAGE \\* MERGEFORMAT </w:instrText>
    </w:r>
    <w:r>
        <w:fldChar w:fldCharType="end"/>
    </w:r>
</w:p>
`);
