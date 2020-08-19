module.exports = (req, res, next) => {
    const Redis = require('ioredis');
    const macAddress= require('node-getmac');
    console.log(macAddress)
    const cache = new Redis({
        port: 6300, // Redis port
        host: "127.0.0.1", // Redis host
        password: "123"
    });
    // cache.get('eggsy').then(data => {
    //     console.log(15, data)
    //     if (data > 5) {
    //         throw new Error("{code:500,msg: '连接次数过多'}");
    //     }
    //     if (!data) {
    //         cache.set('eggsy', 1, 'EX', 60);//设置60秒内访问次数大于5次，报错
    //     } else {
    //         cache.incr('eggsy');
    //         next();
    //     }
    //
    // }).catch(err => {
    //     console.log(err)
    // })
    next();

}