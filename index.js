const cheerio = require('cheerio');
const fs = require('fs');
const req = require('request');


const getChildren = ( html, selector = 'body' ) => {

        $ = cheerio.load(
            html,
            {decodeEntities: true}
        );
        if($(selector).children())
            return $(selector).children()
        else
            return null;
    },
    getSelector = ( html, selector = 'body' ) => {

        $ = cheerio.load(html,{decodeEntities: true});
        if($(selector))
            return $(selector);
        else
            return null;
    },
    hasAttr = ( html, selector, attr ) => {
        const select = `[${attr}]`;
        $ = cheerio.load(html,{decodeEntities: true});
        if($(select))
            return true;
        else
            return false;
    },
    attrHasValue = ( html, attr, value ) => {

        const selector = `[${attr}]`;
        $ = cheerio.load(html,{decodeEntities: true});
        if($(selector) && $(selector).attr(attr) == value) 
            return true;
        else
            return false;
    }
    attrContainsValue = ( html, attr = '', value = '' ) => {

        $ = cheerio.load(html, {});
        const selector = $(`[${attr}*="${value}"]`);


        if(selector.length > 0) {
            let r = []
            selector.each((i, el) => r[i] = `${$(el).attr(attr)}`);
            r = r.reduce((p, c) => p + String.fromCharCode(10) + c);
            return r;
        }else {
            return false;
        }
        // if($(selector) && (pos = $(selector).attr(attr).indexOf(value) != -1)) 
        //     return {
        //         selector: $(selector),
        //         position: pos,
        //     }
        // else
        //     return false;
    }

const res = '';


req('https://www.reddit.com/', async (err, resp, html) => {
    // html = await getSelector(html, 'a');
    try {
        if(!err) {
            if(html != null) {
                let links = await attrContainsValue( html, 'href', '/r/');
                fs.writeFile('./t.txt', links, ( ) => {});
            }
        }
    } catch(e) {
        console.log(e || err);
    }
})
