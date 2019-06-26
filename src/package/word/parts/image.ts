import fetch                            from 'node-fetch';
import {cmToEmu} from "../../../tools";
import {FileIndex, FileIndexType} from "../../../index";

export enum ImagePosition {
    INLINE      = "inline",
    RELATIVE    = "relative",
    ABSOLUTE    = "absolute"
}

export enum ImageHorizontalRelativeFrom {
    CHARACTER       = "character",
    COLUMN          = "column",
    INSIDEMARGIN    = "insideMargin",
    LEFTMARGIN      = "leftMargin",
    MARGIN          = "margin",
    OUTSIDEMARGIN   = "outsideMargin",
    PAGE            = "page",
    RIGHTMARGIN     = "rightMargin"
}

export enum ImageVerticalRelativeFrom {
    BOTTOMMARGIN    = "bottomMargin",
    INSIDEMARGIN    = "insideMargin",
    LINE            = "line",
    MARGIN          = "margin",
    OUTSIDEMARGIN   = "outsideMargin",
    PAGE            = "page",
    PARAGRAPH       = "paragraph",
    TOPMARGIN       = "topMargin"
}

export enum ImageRelativePosition {
    CENTER          = "center",
    INSIDE          = "inside",
    left            = "left",
    OUTSIDE         = "outside",
    RIGHT           = "right"
}

export interface ImageRelativeOptions {
    horizontalRelativeFrom      : ImageHorizontalRelativeFrom,
    horizontalPosition          : ImageRelativePosition,
    verticalRelativeFrom        : ImageVerticalRelativeFrom,
    verticalPosition            : ImageRelativePosition

}

export interface Image {
    fileName                    : string,
    title?                      : string,
    description?                : string,
    buffer?                     : Buffer,
    url?                        : string,
    widthInCm                   : number,
    heightInCm                  : number,
    position?                   : ImagePosition,
    relativePositionOptions?    : ImageRelativeOptions,
    isBackground?               : boolean
}

const getNonVisualProps = (id: number, i: Image): string => `id="${id}" name="${i.fileName}" descr="${i.description}" title="${i.title}"`;

const getNonInlinePositioning    = (position: ImagePosition, relativeOptions: ImageRelativeOptions): string => {
    if(position === ImagePosition.RELATIVE || position === ImagePosition.ABSOLUTE) {
        if(!relativeOptions) {
            return (`
                <wp:positionH relativeFrom="page">
                    <wp:align>left</wp:align>
                </wp:positionH>
                <wp:positionV relativeFrom="page">
                    <wp:align>top</wp:align>
                </wp:positionV>
            `)
        } else {
            return (`
                <wp:positionH relativeFrom="${relativeOptions.horizontalRelativeFrom}">
                    <wp:align>${relativeOptions.horizontalPosition}</wp:align>
                </wp:positionH>
                <wp:positionV relativeFrom="${relativeOptions.verticalRelativeFrom}">
                    <wp:align>${relativeOptions.verticalPosition}</wp:align>
                </wp:positionV>
            `)
        }
    }

    return '';
};

export default (i: Image, fileIndex: FileIndex[], sourceName: string): string => {

    const index     = fileIndex.length + 1;
    const id        = `image_${index}`;

    fileIndex.push({
        id, sourceName,
        type        : FileIndexType.IMAGE,
        fullPath    : `word/media/${i.fileName}`,
        content     : async () => {
            if(i.buffer) return i.buffer;

            const f = await fetch(i.url);

            return f.buffer();
        }
    });

    const cx        = cmToEmu(i.widthInCm, 0);
    const cy        = cmToEmu(i.heightInCm, 0);

    let positionElement  = "";
    switch(i.position) {
        case ImagePosition.ABSOLUTE:
            positionElement = "anchor";
            break;
        case ImagePosition.RELATIVE:
            positionElement = "anchor";
            break;
        default:
            positionElement = "inline";
    }

    return (`
<w:r>
    <w:rPr>
        <w:noProof/>
    </w:rPr>
    <w:drawing>
        <wp:${positionElement} 
            distT="0" distB="0" distL="0" distR="0" 
            simplePos="${i.position === ImagePosition.ABSOLUTE ? "1" : "0"}" relativeHeight="251658240" 
            behindDoc="${i.isBackground === true}" locked="0" layoutInCell="1" allowOverlap="1"
        >
            <wp:simplePos x="0" y="0"/> <!-- Not supported by Microsoft Word - Both tags simplePos & positionHV must be present -->
            ${getNonInlinePositioning(i.position, i.relativePositionOptions)}
            <wp:extent cx="${cx}" cy="${cy}"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:wrapNone/>
            <wp:docPr ${getNonVisualProps(index, i)} />
            <wp:cNvGraphicFramePr>
                <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" />
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                    <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                        <pic:nvPicPr>
                            <pic:cNvPr ${getNonVisualProps(index, i)} />
                            <pic:cNvPicPr/>
                        </pic:nvPicPr>
                        <pic:blipFill>
                            <a:blip r:embed="${id}" />
                        </pic:blipFill>
                        <pic:spPr>
                            <a:xfrm>
                                <a:off x="0" y="0"/>
                                <a:ext cx="${cx}" cy="${cy}"/>
                            </a:xfrm>
                            <a:prstGeom prst="rect">
                                <a:avLst/>
                            </a:prstGeom>
                        </pic:spPr>
                    </pic:pic>
                </a:graphicData>
            </a:graphic>
        </wp:${positionElement}>
    </w:drawing>
</w:r>
    `)
}