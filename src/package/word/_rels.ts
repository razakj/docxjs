import {ContentOptions} from "../contenttypes";
import {FileIndex} from "../../index";

export default (contentOptions: ContentOptions, fileIndex: FileIndex[]): string => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    ${fileIndex.map(f => `<Relationship Id="${f.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/${f.type}" Target="/${f.fullPath}" />`).join('')}
    ${contentOptions.hasDefaultHeader         ?
        '<Relationship Id="defaultHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="defaultHeader.xml"/>' : ''
    }
    ${contentOptions.hasDefaultFooter        ?
        '<Relationship Id="defaultFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="defaultFooter.xml"/>' : ''
    }
    ${contentOptions.hasFirstPageHeader         ?
        '<Relationship Id="firstPageHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="firstPageHeader.xml"/>' : ''
    }
    ${contentOptions.hasFirstPageFooter         ?
        '<Relationship Id="firstPageFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="firstPageFooter.xml"/>' : ''
    }
    <Relationship Id="styles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
    <Relationship Id="settings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/>
    <Relationship Id="webSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings" Target="webSettings.xml"/>
    <Relationship Id="fontTable" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" Target="fontTable.xml"/>
</Relationships>
`)