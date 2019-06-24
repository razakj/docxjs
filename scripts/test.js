const fs        = require('fs');
const path      = require('path');

const docxjs = require('../lib/index');

(async() => {
    try {
        const b = await docxjs.toFile({
            filePath    : 'C:\\Users\\jakub\\Desktop\\test.docx',
            defaultHeader       : {
                paragraphs      : [
                    {content: {
                        type    : "image",
                        data    : {
                            fileName        : 'test.jpg',
                            title           : 'Test',
                            description     : 'Testing',
                            buffer          : fs.readFileSync(path.join('C:\\Users\\jakub\\Pictures', 'unnamed.jpg')),
                            widthInCm       : 10,
                            heightInCm      : 2,
                            position        : "anchor"
                        }
                    }}
                ]
            },
            // defaultFooter       : {
            //     paragraphs      : [{content: 'DEFAULT FOOTER'}, {content: 'DEFAULT FOOTER'}]
            // },
            documentProperties         : {
                headerFromTopInCm       : 0,
                footerFromBottomInCm    : 0,

            },
            styles      : {
                testStyle: {
                    paragraph: {
                        // spacing             : {
                        //     after               : 0,
                        //     before              : 0,
                        //     beforeAutospacing   : 0,
                        //     afterAutospacing    : 0,
                        //     line                : 0,
                        //     lineRule            : 0
                        // }
                    },
                    text: {
                        color: 'red'
                    }
                }
            },
            htmlContent : (`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>table, th, td {border: 1px solid black;border-collapse:collapse;}</style>
                    <title>HTML import</title>
                  </head>
                  <body>
                    <p>Simple paragraph with a 
                    <strong>emphasized</strong> word.</p>
                    <p>Example of a table:</p>
                    <table>
                      <tr>
                        <th style="width: 300px;">Col 1</th>
                        <th>Col 2</th>
                      </tr>
                      <tr>
                        <td>ROW 1</td>
                        <td>ROW 1</td>
                      </tr>
                      <tr>
                        <td>ROW 2</td>
                        <td>ROW 2</td>
                      </tr>
                    </table>
                    <div style="page-break-before: always;">test</div>
                    <div>test</div>
                  </body>
                </html>
            `)
        });
    } catch(err) {
        console.error(err)
        process.exit(-1);
    }
})();