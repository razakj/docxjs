"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const tools_1 = require("../../../tools");
const index_1 = require("../../../index");
var ImagePosition;
(function (ImagePosition) {
    ImagePosition["INLINE"] = "inline";
    ImagePosition["RELATIVE"] = "relative";
    ImagePosition["ABSOLUTE"] = "absolute";
})(ImagePosition = exports.ImagePosition || (exports.ImagePosition = {}));
var ImageHorizontalRelativeFrom;
(function (ImageHorizontalRelativeFrom) {
    ImageHorizontalRelativeFrom["CHARACTER"] = "character";
    ImageHorizontalRelativeFrom["COLUMN"] = "column";
    ImageHorizontalRelativeFrom["INSIDEMARGIN"] = "insideMargin";
    ImageHorizontalRelativeFrom["LEFTMARGIN"] = "leftMargin";
    ImageHorizontalRelativeFrom["MARGIN"] = "margin";
    ImageHorizontalRelativeFrom["OUTSIDEMARGIN"] = "outsideMargin";
    ImageHorizontalRelativeFrom["PAGE"] = "page";
    ImageHorizontalRelativeFrom["RIGHTMARGIN"] = "rightMargin";
})(ImageHorizontalRelativeFrom = exports.ImageHorizontalRelativeFrom || (exports.ImageHorizontalRelativeFrom = {}));
var ImageVerticalRelativeFrom;
(function (ImageVerticalRelativeFrom) {
    ImageVerticalRelativeFrom["BOTTOMMARGIN"] = "bottomMargin";
    ImageVerticalRelativeFrom["INSIDEMARGIN"] = "insideMargin";
    ImageVerticalRelativeFrom["LINE"] = "line";
    ImageVerticalRelativeFrom["MARGIN"] = "margin";
    ImageVerticalRelativeFrom["OUTSIDEMARGIN"] = "outsideMargin";
    ImageVerticalRelativeFrom["PAGE"] = "page";
    ImageVerticalRelativeFrom["PARAGRAPH"] = "paragraph";
    ImageVerticalRelativeFrom["TOPMARGIN"] = "topMargin";
})(ImageVerticalRelativeFrom = exports.ImageVerticalRelativeFrom || (exports.ImageVerticalRelativeFrom = {}));
var ImageRelativePosition;
(function (ImageRelativePosition) {
    ImageRelativePosition["CENTER"] = "center";
    ImageRelativePosition["INSIDE"] = "inside";
    ImageRelativePosition["LEFT"] = "left";
    ImageRelativePosition["OUTSIDE"] = "outside";
    ImageRelativePosition["RIGHT"] = "right";
})(ImageRelativePosition = exports.ImageRelativePosition || (exports.ImageRelativePosition = {}));
const getNonVisualProps = (id, i) => `id="${id}" name="${i.fileName}" descr="${i.description}" title="${i.title}"`;
const getNonInlinePositioning = (position, relativeOptions) => {
    if (position === ImagePosition.RELATIVE || position === ImagePosition.ABSOLUTE) {
        if (!relativeOptions) {
            return (`
                <wp:positionH relativeFrom="page">
                    <wp:align>left</wp:align>
                </wp:positionH>
                <wp:positionV relativeFrom="page">
                    <wp:align>top</wp:align>
                </wp:positionV>
            `);
        }
        else {
            return (`
                <wp:positionH relativeFrom="${relativeOptions.horizontalRelativeFrom}">
                    <wp:align>${relativeOptions.horizontalPosition}</wp:align>
                </wp:positionH>
                <wp:positionV relativeFrom="${relativeOptions.verticalRelativeFrom}">
                    <wp:align>${relativeOptions.verticalPosition}</wp:align>
                </wp:positionV>
            `);
        }
    }
    return '';
};
exports.default = (i, fileIndex, sourceName) => {
    const index = fileIndex.length + 1;
    const id = `image_${index}`;
    fileIndex.push({
        id, sourceName,
        type: index_1.FileIndexType.IMAGE,
        fullPath: `word/media/${i.fileName}`,
        content: async () => {
            if (i.buffer)
                return i.buffer;
            const f = await node_fetch_1.default(i.url);
            return f.buffer();
        }
    });
    const cx = tools_1.cmToEmu(i.widthInCm, 0);
    const cy = tools_1.cmToEmu(i.heightInCm, 0);
    let positionElement = "";
    switch (i.position) {
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
    `);
};
