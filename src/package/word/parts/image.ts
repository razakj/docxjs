import {cmToEmu} from "../../../tools";

export enum ImagePosition {
    INLINE      = "inline",
    ABSOLUTE    = "absolute"
}

export interface ImageAbsoluteOptions {

}

export interface Image {
    fileName        : string,
    title?          : string,
    description?    : string,
    buffer          : Buffer,
    widthInCm       : number,
    heightInCm      : number,
    position?       : ImagePosition,
    absoluteOptions : ImageAbsoluteOptions
}

export interface ImageIndex {
    id              : number,
    fileName        : string,
    buffer          : Buffer,
    sourceName      : string,
}

const getNonVisualProps = (id: number, i: Image): string => `id="${id}" name="${i.fileName}" descr="${i.description}" title="${i.title}"`;

export default (i: Image, imageIndex: ImageIndex[], sourceName: string): string => {

    const id        = imageIndex.length + 1;

    imageIndex.push({
        id, sourceName,
        fileName    : i.fileName,
        buffer      : i.buffer
    });

    const cx        = cmToEmu(i.widthInCm, 0);
    const cy        = cmToEmu(i.heightInCm, 0);
    const position  = i.position ? i.position : ImagePosition.INLINE;

    return (`
<w:r>
    <w:rPr>
        <w:noProof/>
    </w:rPr>
    <w:drawing>
        <wp:${position} distT="0" distB="0" distL="114300" distR="114300" simplePos="0" relativeHeight="251658240" behindDoc="1" locked="0" layoutInCell="1" allowOverlap="1">
            <wp:simplePos x="0" y="0"/>
            <wp:positionH relativeFrom="page">
                <wp:align>left</wp:align>
            </wp:positionH>
            <wp:positionV relativeFrom="page">
                <wp:align>top</wp:align>
            </wp:positionV>
            <wp:extent cx="${cx}" cy="${cy}"/>
            <wp:effectExtent l="0" t="0" r="0" b="0"/>
            <wp:wrapNone/>
            <wp:docPr ${getNonVisualProps(id, i)} />
            <wp:cNvGraphicFramePr>
                <a:graphicFrameLocks xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" />
            </wp:cNvGraphicFramePr>
            <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                    <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                        <pic:nvPicPr>
                            <pic:cNvPr ${getNonVisualProps(id, i)} />
                            <pic:cNvPicPr/>
                        </pic:nvPicPr>
                        <pic:blipFill>
                            <a:blip r:embed="${i.fileName}" cstate="print" />
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
        </wp:${position}>
    </w:drawing>
</w:r>
    `)
}