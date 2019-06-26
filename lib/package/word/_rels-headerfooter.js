"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fileIndex) => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    ${fileIndex.map(f => `<Relationship Id="${f.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/${f.type}" Target="/${f.fullPath}" />`).join(' ')}
</Relationships>
`);
