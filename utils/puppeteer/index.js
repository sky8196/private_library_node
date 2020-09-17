const puppeteer = require('puppeteer'); //引入puppeteer库

/**
 * IndexData 获取首页数据
 * @returns {Promise<boolean|array>}
 */
const getIndexData = async ()=>{
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args:['--no-sandbox'] // CentOS 下需要
        });
        const page = await browser.newPage();
        await page.goto('http://www.xbiquge.la/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#hotcontent .item');

        let indexData = await page.evaluate(() => {
            let $ = window.$;
            // 热门小说
            const hotRecommend = $('#hotcontent .item');
            let hotRecommendList = [];
            if (hotRecommend.length >= 1) {
                hotRecommend.each((index, item) => {
                    let ele = $(item);
                    let link = ele.find('.image a').attr('href');
                    let image = ele.find('.image a img').attr('src');
                    let title = ele.find('dl a').text();
                    let abstract = ele.find('dl dd').text();
                    let author = ele.find('dl dt span').text();
                    hotRecommendList.push({
                        link,
                        title,
                        image,
                        abstract,
                        author
                    })
                })
            }

            // 玄幻推荐
            const  otherRecommend = $('.novelslist .content')
            let otherRecommendList = []
            if (otherRecommend.length >= 1) {
                otherRecommend.each((index, item) => {
                    let ele = $(item);
                    const h2 = ele.find('h2').text()
                    const topImage = ele.find('.top img').attr('src');
                    const topTitle = ele.find('.top dl dt a').text();
                    const topLink = ele.find('.top dl dt a').attr('href');
                    const topAbstract = ele.find('.top dl dd').text();
                    const other = ele.find('ul li');
                    let otherList = [];
                    other.each((index,item) => {
                        const ele = $(item);
                        const link = ele.find('a').attr('href');
                        const title = ele.find('a').text();
                        otherList.push({link,title});
                    });
                    otherRecommendList.push({
                        h2,topAbstract,topImage,topLink,topTitle,otherList
                    });
                });
            };
            return {hotRecommendList,otherRecommendList};
        });

        await browser.close();  //关闭浏览器
        return indexData;
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
            headless: true,
            args:['--no-sandbox']
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
        const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
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
/**
 * LatestUpdatesList 获取分类最新更新列表
 * @param url string
 * @returns {Promise<boolean|array>}
 */
const getClassLatestUpdatesList = async (url = '') => {
    try {
        const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('#newscontent');
        let res = await page.evaluate(() => {
            let $ = window.$;
            let items = $('#newscontent .l ul li');
            let lsArray = [];
            let linkArray = [];
            if (items.length >= 1) {
                items.each((index, item) => {
                    let ele = $(item);
                    let title = ele.find('.s2 a').text();
                    let link = `http://www.xbiquge.la${ele.find('.s2 a').attr('href')}`;
                    let latestArticleLink = `http://www.xbiquge.la${ele.find('.s3 a').attr('href')}`;
                    let latestArticleTitle = ele.find('.s3').text();
                    let author = ele.find('.s5').text();
                    if (linkArray.indexOf(link) === -1 ) {
                        title = title.replace(/\s*/g,'');
                        linkArray.push(link);
                        lsArray.push({
                            link,
                            title,
                            latestArticleLink,
                            latestArticleTitle,
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
 * ClassNovels 获取分类小说
 * @param url string
 * @returns {Promise<boolean|array>}
 */
const getClassNovels = async (url = '') => {
    try {
        const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('#newscontent');
        let res = await page.evaluate(() => {
            let $ = window.$;
            let items = $('#newscontent .r ul li');
            let lsArray = [];
            let linkArray = [];
            if (items.length >= 1) {
                items.each((index, item) => {
                    let ele = $(item);
                    let title = ele.find('.s2 a').text();
                    let link = ele.find('.s2 a').attr('href');
                    let author = ele.find('.s5').text();
                    if (linkArray.indexOf(link) === -1 ) {
                        title = title.replace(/\s*/g,'');
                        linkArray.push(link);
                        lsArray.push({
                            link,
                            title,
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
 * SearchData 搜索
 * @param keywords
 * @return {Promise}
 */
const getSearchData = async (keywords = '') => {
    try {
        const browser = await puppeteer.launch({ headless: true, args:['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('http://m.xbiquge.la/modules/article/waps.php', { waitUntil: 'networkidle2' });
        const input_search = await page.$('#s_key')
        await input_search.type(keywords)
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
        await browser.close();  //关闭浏览器
        return res
    } catch (e) {
        console.log("error:",e.message);
        return false
    }
}

module.exports = {
    getIndexData,
    getArticleDetails,
    getArticleCatalog,
    getClassLatestUpdatesList,
    getClassNovels,
    getSearchData
}


