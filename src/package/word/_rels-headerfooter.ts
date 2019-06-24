import {ImageIndex}          from "./parts/image";

export default (imageIndex: ImageIndex[]): string => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    ${imageIndex.map(img => `<Relationship Id="${img.fileName}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${img.fileName}"/>`)}
</Relationships>
`)