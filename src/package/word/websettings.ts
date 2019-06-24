export interface WebSettingsProperties {

}


export default (webSettingsProperties: WebSettingsProperties): string => (`
<?xml version="1.0" encoding="ISO-8859-1"?>
<w:webSettings mc:Ignorable="w14 w15 w16se" 
    xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" 
    xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" 
    xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" 
    xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" 
    xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" 
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
>
    <w:optimizeForBrowser/>
    <w:allowPNG/>
</w:webSettings>
`)