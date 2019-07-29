"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getChapterHyperlink = (chapter, level) => {
    return (`
<w:p>
    <w:pPr>
        <w:pStyle w:val="__TOC_LEVEL${level}"/>
        <w:tabs>
            <w:tab w:val="right" w:leader="dot" w:pos="9016"/>
        </w:tabs>
    </w:pPr>
    <w:hyperlink w:anchor="${chapter.referencePoint}" w:history="1">
        <w:r>
            <w:rPr>
                <w:rStyle w:val="__TOC_HYPERLINK"/>
            </w:rPr>
            <w:t>${chapter.label}</w:t>
        </w:r>
        <w:r>
            <w:tab/>
        </w:r>
        <w:r w:rsidR="003112C9">
            <w:fldChar w:fldCharType="begin"/>
        </w:r>
        <w:r w:rsidR="003112C9">
            <w:instrText xml:space="preserve"> PAGEREF ${chapter.referencePoint} \\h </w:instrText>
        </w:r>
        <w:r w:rsidR="003112C9">
            <w:fldChar w:fldCharType="separate"/>
        </w:r>
        <w:r>
            <w:t></w:t>
        </w:r>
        <w:r w:rsidR="003112C9">
            <w:fldChar w:fldCharType="end"/>
        </w:r>
    </w:hyperlink>
</w:p>
${Array.isArray(chapter.chapters) && chapter.chapters.length > 0 ? chapter.chapters.map(ch => getChapterHyperlink(ch, level + 1)) : ''}
`);
};
exports.default = (toc) => (`
<w:p>
    <w:r>
        <w:fldChar w:fldCharType="begin"/>
    </w:r>
    <w:r>
        <w:instrText xml:space="preserve"> TOC \\o "0-0" \\h \\z \\u </w:instrText>
    </w:r>
    <w:r>
        <w:fldChar w:fldCharType="separate"/>
    </w:r>
    ${toc.chapters.map(ch => getChapterHyperlink(ch, 1))}
</w:p>
<w:p>
    <w:pPr>
        <w:tabs>
            <w:tab w:val="right" w:leader="dot" w:pos="0"/>
        </w:tabs>
    </w:pPr>
    <w:r>
        <w:fldChar w:fldCharType="end"/>
    </w:r>
</w:p>
`);
