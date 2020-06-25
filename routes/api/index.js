var express = require('express');
var router = express.Router();
const { getHotRecommend, getArticleDetails, getArticleCatalog } = require('../../utils/puppeteer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('当前路径错误，请访问正确的路径');
});

router.get('/hot_recommend', async function(req, res, next) {
    const result = await getHotRecommend();
    let send = { code: 404, msg: '请求超时' };
    if ( result ){
        send = { code: 200, msg: result };
    }
    res.send(send);
});

router.get('/article_details', async function(req, res, next) {
    const { url = false } = req.query;
    let send = { code: 404, msg: '请求超时' };
    if ( !url ) {
        res.send({ code: 403, msg: "缺少必传参数" });
        return ;
    }
    const result = await getArticleDetails(url);
    if ( result ){
        send = { code: 200, msg: result };
    }

    res.send(send);
});

router.get('/article_list', async function(req, res, next) {
    const { url = false } = req.query;
    let send = { code: 404, msg: '请求超时' };

    if ( !url ) {
        res.send({ code: 403, msg: "缺少必传参数" });
        return ;
    }

    const result = await getArticleCatalog(url);
    if ( result ){
        send = { code: 200, msg: result };
    }

    res.send(send);
});


module.exports = router;
