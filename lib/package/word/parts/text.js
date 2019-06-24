"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (t) => typeof t === "string" ? (`
<w:r>
    <w:t>${t}</w:t>
</w:r>
`) : (`
<w:r>
    <w:t>${t.text}</w:t>
</w:r>
`);
