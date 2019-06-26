"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (t) => typeof t === "string" ? (`
<w:r><w:t xml:space="preserve">${t}</w:t></w:r>
`) : (`
<w:r>
    <w:rPr>
        ${t.styleId ? `<w:rStyle w:val="${t.styleId}"/>` : ''}
    </w:rPr>
    <w:t xml:space="preserve">${t.text}</w:t>
</w:r>
`);
