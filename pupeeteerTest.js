const puppeteer = require('puppeteer');

const getSearch = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            // args:['--no-sandbox'] // CentOS 下需要
        });
        const page = await browser.newPage();
        await page.goto('http://m.xbiquge.la/modules/article/waps.php', { waitUntil: 'networkidle2' });
        const input_search = await page.$('#s_key')
        await input_search.type('斗罗')
        const search_btn = await page.$('.go')
        await search_btn.click();
        await page.waitForNavigation();
        let res = await page.evaluate(() => {
            let $ = window.$;
            let items = $('.read_book .block');
            let lsArray = [];
            let linkArray = [];
            if (items.length >= 1) {
                items.each((index, item) => {
                    let ele = $(item);
                    let link = ele.find('.block_img a').attr('href');
                    let image = ele.find('.block_img a img').attr('src');
                    let title = ele.find('.block_txt h2 a').text();
                    let latestChapter = ele.find('.block_txt p').find('a')[2] ;
                    let latestChapterLink = ele.find('.block_txt p').find('a')[2] ;
                    console.log(latestChapterLink)
                    // let author = ele.find('.block_txt p').eq(2).text();
                    if ( linkArray.indexOf(link) === -1 ) {
                        // author = author.replace(/\s*/g,'');
                        linkArray.push(link);
                        lsArray.push({
                            link,
                            title,
                            image,
                            latestChapter,
                            // latestChapterLink,
                            // author,
                        })
                    }
                })
            }
            return lsArray;
        });
        console.log(res)
        // await browser.close();  //关闭浏览器
    } catch (e) {
        console.log("error:",e.message);
        return false
    }
}
// getSearch()