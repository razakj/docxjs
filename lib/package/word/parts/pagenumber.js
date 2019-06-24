"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageNumberPosition;
(function (PageNumberPosition) {
    PageNumberPosition["TOP"] = "top";
    PageNumberPosition["BOTTOM"] = "bottom";
})(PageNumberPosition = exports.PageNumberPosition || (exports.PageNumberPosition = {}));
exports.default = (pageNumber) => (`
<w:p>
    ${pageNumber.styleId ? (`
        <w:pPr>
            <w:pStyle w:val="${pageNumber.styleId}"/>
        </w:pPr>
    `) : ''}
    <w:r w:rsidRPr="00AB009C">
        <w:rPr>
            <w:rFonts w:ascii="Arial" w:eastAsia="Arial" w:hAnsi="Arial" w:cs="Arial"/>
            <w:sz w:val="16"/>
            <w:szCs w:val="16"/>
        </w:rPr>
        <w:t>${pageNumber.label}</w:t>
    </w:r>
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
`);
