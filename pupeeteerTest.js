const puppeteer = require('puppeteer');

const getSearch = async () => {
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
            const  fantasy = $('.novelslist .content')
            let fantasyList = []
            if (fantasy.length >= 1) {
                fantasy.each((index, item) => {
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
                        fantasyList.push({
                            h2,topAbstract,topImage,topLink,topTitle,otherList
                        });
                    });
                };
            return {hotRecommendList,fantasyList};
        });

        await browser.close();  //关闭浏览器
        return indexData;
        // console.log(indexData)
    } catch (e) {
        console.log("error:",e.message);
        return false
    }
}
getSearch()