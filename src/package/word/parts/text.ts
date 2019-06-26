import {StylesProperties} from "../styles";

export interface TextProps {
    text        : string,
    styleId?    : keyof StylesProperties
}

export type Text = TextProps | string;

export default (t: Text): string => typeof t === "string" ? (`
<w:r><w:t xml:space="preserve">${t}</w:t></w:r>
`) : (`
<w:r>
    <w:rPr>
        ${t.styleId ? `<w:rStyle w:val="${t.styleId}"/>` : ''}
    </w:rPr>
    <w:t xml:space="preserve">${t.text}</w:t>
</w:r>
`)