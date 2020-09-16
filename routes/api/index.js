const express = require('express');
const router = express.Router();
const { getHotRecommend, getArticleDetails, getArticleCatalog, getClassNovels, getClassLatestUpdatesList, getSearchData } = require('../../utils/puppeteer');
const {getRedis,setRedis} = require('../../utils/redis')
/* API ROOT */
router.get('/', function(req, res, next) {
    res.send('当前路径错误，请访问正确的路径');
});

/** 获取热门小说top4 */
router.get('/hot_recommend', async function(req, res, next) {
    let send = { status: 408, msg: '请求超时' };
    const redisRes = await getRedis('hot_recommend');
    if (redisRes) {
        send = { status: 200, msg: JSON.parse(redisRes) };
    } else {
        const result = await getHotRecommend();
        if ( result ){
            send = { status: 200, msg: result };
        }
        setRedis('hot_recommend',JSON.stringify(result))
    }
    res.send(send);
});

/** 获取文章详情 */
router.get('/article_details', async function(req, res, next) {
    const { url = false } = req.query;
    let send = { status: 408, msg: '请求超时' };
    if ( !url ) {
        res.send({ status: 403, msg: "缺少必传参数" });
        return ;
    }
    const result = await getArticleDetails(url);
    if ( result ){
        send = { status: 200, msg: result };
    }

    res.send(send);
});

/** 获取文章目录列表 */
router.get('/article_list', async function(req, res, next) {
    const { url = false } = req.query;
    let send = { status: 408, msg: '请求超时' };

    if ( !url ) {
        res.send({ status: 403, msg: "缺少必传参数" });
        return ;
    }

    const result = await getArticleCatalog(url);
    if ( result ){
        send = { status: 200, msg: result };
    }

    res.send(send);
});

/** 获取分类小说列表 */
router.get('/class_novels', async function(req, res, next) {
    const { url = false } = req.query;
    let send = { status: 408, msg: '请求超时' };

    if ( !url ) {
        res.send({ status: 403, msg: "缺少必传参数" });
        return ;
    }

    const result = await getClassNovels(url);
    if ( result ){
        send = { status: 200, msg: result };
    }

    res.send(send);
})

/** 获取分类最新更新列表 */
router.get('/latest_updates_list', async function(req, res, next) {
    const { url = false } = req.query;
    let send = { status: 408, msg: '请求超时' };

    if ( !url ) {
        res.send({ status: 403, msg: "缺少必传参数" });
        return ;
    }

    const result = await getClassLatestUpdatesList(url);
    if ( result ){
        send = { status: 200, msg: result };
    }

    res.send(send);
})

/** 搜索 */
router.get('/search', async function(req,res,next) {
    const { keywords = '' } = req.query;
    let send = { status: 408, msg: '请求超时' };

    if ( !keywords ) {
        res.send({ status: 403, msg: "缺少必传参数" });
        return ;
    }

    const result = await getSearchData(keywords);
    if ( result ){
        send = { status: 200, msg: result };
    }

    res.send(send);
})



module.exports = router;
