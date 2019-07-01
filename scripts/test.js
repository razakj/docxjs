const fs        = require('fs');
const path      = require('path');

const docxjs = require('../lib/index');

(async() => {
    try {
        const b = await docxjs.toFile({
            filePath    : 'C:\\Users\\jakub\\Desktop\\test.docx',
            defaultHeader       : {
                pageNumber      : {
                    label       : 'Page # ',
                    position    : "top"
                }
                // body            : [
                //     {paragraph  : {
                //         content : {
                //             type    : "image",
                //             data    : {
                //                 fileName        : 'test.jpg',
                //                 title           : 'Test',
                //                 description     : 'Testing',
                //                 url             : 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                //                 widthInCm       : 50,
                //                 heightInCm      : 1,
                //                 position        : "relative",
                //                 isBackground    : true,
                //                 relativePositionOptions : {
                //                     horizontalRelativeFrom  : "page",
                //                     verticalRelativeFrom    : "page",
                //                     horizontalPosition      : "center",
                //                     verticalPosition        : "center"
                //                 }
                //             }
                //         }
                //     }},
                //     {html: '<html><head></head><body><table style="width: 100%"><tbody><tr><td style="color: red;">sdasdsa</td><td>adasdasdas</td></tr></tbody></table></body></html>'},
                // ]
            },
            documentProperties         : {
                headerFromTopInCm       : 0,
                footerFromBottomInCm    : 0,


            },
            // firstPageHeader             : {
            //     body                    : [
            //         {paragraph: {content    : [
            //             {type: "text", data: "Hi1"}, {type: "text", data: "Hi2"}
            //         ]}},
            //         {html: '<html><head></head><body><div style="margin-left: -20px;">HEADER</div></body></html>'}
            //     ]
            // },
            body                        : [
                // {paragraph: 'Test'},
                // {paragraph: {content    : [
                //     {
                //         type    : "image",
                //         data    : {
                //             fileName        : 'test2.jpg',
                //             title           : 'Test 2',
                //             description     : 'Testing 2',
                //             //buffer          : fs.readFileSync(path.join('C:\\Users\\jakub\\Pictures', 'unnamed.jpg')),
                //             url             : 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                //             widthInCm       : 50,
                //             heightInCm      : 1,
                //             position        : "relative",
                //             isBackground    : true,
                //             relativePositionOptions : {
                //                 horizontalRelativeFrom  : "page",
                //                 verticalRelativeFrom    : "line",
                //                 horizontalPosition      : "left",
                //                 verticalPosition        : "top"
                //             }
                //         }
                //     },
                //     {
                //         type    : "text",
                //         data    : "Hello i'm text"
                //     }
                // ]}},
                {paragraph: {
                    content : ['test', '  test2']
                }},
                //{html: '<html><head></head><body><table><tbody><tr><td>sdasdsa</td><td>adasdasdas</td></tr></tbody></table></body></html>'},
                // {html: '<html><head></head><body><strong>BODY</strong></body></html>'},
                // {html: '<html><head></head><body><strong>BODY</strong></body></html>'},
                // {html: '<html><head></head><body><strong>BODY</strong></body></html>'},
                // {html: '<html><head></head><body><strong>BODY</strong></body></html>'},
                // {html: '<html><head></head><body><strong>BODY</strong></body></html>'}
            ],
            docDefaults : {
                default : {
                    paragraph: {
                        spacing : {
                            after : 0,
                            before:0
                        }
                    },
                    text    : {
                        font : {
                            ascii : 'Courier New'
                        }
                    }
                }
            },
            styles      : {
                testTextStyle: {
                    type    : "character",
                    text    : {
                        color: 'red'
                    }
                }
            },
        });
    } catch(err) {
        console.error(err)
        process.exit(-1);
    }
})();