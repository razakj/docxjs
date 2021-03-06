export interface ContentOptions {
    hasDefaultHeader            : boolean,
    hasDefaultFooter            : boolean,
    hasFirstPageHeader          : boolean,
    hasFirstPageFooter          : boolean,
    hasVba                      : boolean
}


export default (contentTypeProperties: ContentOptions): string => (`
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
    <Default Extension="xml" ContentType="application/xml"/>
    <Default Extension="jpg" ContentType="image/jpeg"/>
    <Default Extension="png" ContentType="image/png"/>
    <Default Extension="html" ContentType="text/html"/>
    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
    ${contentTypeProperties.hasDefaultHeader        ? 
        '<Override PartName="/word/defaultHeader.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' : ''
    }
    ${contentTypeProperties.hasDefaultFooter        ?
        '<Override PartName="/word/defaultFooter.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' : ''
    }
    ${contentTypeProperties.hasFirstPageHeader      ?
        '<Override PartName="/word/firstPageHeader.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' : ''
    }
    ${contentTypeProperties.hasFirstPageFooter     ?
        '<Override PartName="/word/firstPageFooter.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' : ''
    }
    ${contentTypeProperties.hasVba     ?
        '<Override PartName="/word/vbaData.xml" ContentType="application/vnd.ms-word.vbaData+xml"/> <Default Extension="bin" ContentType="application/vnd.ms-office.vbaProject"/>' : ''
    }
    <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
    <Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/>
    <Override PartName="/word/webSettings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml"/>
    <Override PartName="/word/fontTable.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml"/>
    <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
    <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
`)