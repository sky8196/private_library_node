Private Library
=

## 介绍
使用**express**搭建的**node服务**，数据来源于 [笔趣阁](http://www.xbiquge.la/) 使用 [puppeteer](https://github.com/puppeteer/puppeteer) 抓取

## 启动
```
npm i
npm start
```

### 已完成api
|  name   | path  |
|  :----  | :---  |
| 获取热门小说 | /api/hot_recommend |
| 获取文章详情 | /api/article_details?url=http://www.xbiquge.la/10/10489/4534454.html |
| 获取文章目录 | /api/article_list?url=http://www.xbiquge.la/10/ |
| 获取分类小说TOP30 | /api/latest_updates_list?url=http://www.xbiquge.la/xuanhuanxiaoshuo/ |
| 获取分类最新更新列表 | /api/latest_updates_list?url=http://www.xbiquge.la/xuanhuanxiaoshuo/ |
