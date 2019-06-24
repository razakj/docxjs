export interface TextProps {
    text: string
}

export type Text = TextProps | string;

export default (t: Text): string => typeof t === "string" ? (`
<w:r>
    <w:t>${t}</w:t>
</w:r>
`) : (`
<w:r>
    <w:t>${t.text}</w:t>
</w:r>
`)