const puppeteer = require('puppeteer'); //引入puppeteer库

/**
 * HotRecommend 获取热门书籍
 * @returns {Promise<boolean|array>}
 */
const getHotRecommend = async ()=>{
    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('http://www.xbiquge.la/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#hotcontent .item');
        let res = await page.evaluate(() => {
            let $ = window.$;
            let items = $('#hotcontent .item');
            let lsArray = [];
            let linkArray = [];
            if (items.length >= 1) {
                items.each((index, item) => {
                    let ele = $(item);
                    let link = ele.find('.image a').attr('href');
                    let image = ele.find('.image a img').attr('src');
                    let title = ele.find('dl a').text();
                    let abstract = ele.find('dl dd').text();
                    let author = ele.find('dl dt span').text();
                    if ( linkArray.indexOf(link) === -1 ) {
                        title = title.replace(/\s*/g,'');
                        abstract = abstract.replace(/\s*/g,'');
                        author = author.replace(/\s*/g,'');
                        linkArray.push(link);
                        lsArray.push({
                            link,
                            title,
                            image,
                            abstract,
                            author
                        })
                    }
                })
            }
            return lsArray;
        });
        await browser.close();  //关闭浏览器
        return res;
    } catch (e) {
        console.log("error:",e.message);
        return false
    }
}

/**
 * ArticleDetails 获取文章详情
 * @param url string
 * @returns {Promise<boolean|{any}>}
 */
const getArticleDetails = async (url='') => {
    try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('#content');
        let res = await page.evaluate(() => {
            let $ = window.$;
            let content = $('#content').html();
            content = content.replace(/\s*/g,'');
            content = content.replace(/<p.*?p>/,'');
            return content;
        });
        await browser.close();  //关闭浏览器
        return res;
    } catch (e) {
        console.log("error:",e.message);
        return false
    }
}

/**
 * ArticleCatalog 获取文章目录
 * @param url string
 * @returns {Promise<boolean|array>}
 */
const getArticleCatalog = async (url = '') => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto('http://www.xbiquge.la/10/10489/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#list');
        let res = await page.evaluate(() => {
            let $ = window.$;
            let items = $('#list dl dd');
            let lsArray = [];
            let linkArray = [];
            if (items.length >= 1) {
                items.each((index, item) => {
                    let ele = $(item);
                    let title = ele.find('a').text();
                    let link = `http://www.xbiquge.la${ele.find('a').attr('href')}`;
                    if (linkArray.indexOf(link) === -1 ) {
                        title = title.replace(/\s*/g,'');
                        linkArray.push(link);
                        lsArray.push({
                            link,
                            title
                        })
                    }
                })
            }
            return lsArray;
        });
        await browser.close();  //关闭浏览器
        return res;
    } catch (e) {
        console.log("error:",e.message);
        return false
    }
}


module.exports = {
    getHotRecommend,
    getArticleDetails,
    getArticleCatalog
}


