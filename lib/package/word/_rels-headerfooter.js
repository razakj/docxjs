"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (imageIndex) => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    ${imageIndex.map(img => `<Relationship Id="${img.fileName}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${img.fileName}"/>`)}
</Relationships>
`);
