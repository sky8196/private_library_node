const redis = require('redis');

const conf = {
    redis_post: 6379,
    redis_hostname: '127.0.0.1'
}

const _createClient = () => {
    const client = redis.createClient(conf.redis_post, conf.redis_hostname);
    client.on('error', function (err) {
        console.log('redis error: ' + err);
    });
    return client;
};

const redisClient = _createClient();

// 设置redis
const setRedis = (key,value, seconds=60*60) => {
    redisClient.set(key,value);
    // 设置过期时间
    if (seconds) {
        redisClient.expire(key,seconds);
    }
};

// 获取redis

const getRedis = async (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key,(err,val)=> {
            if (err) {
                reject(err)
            }
            resolve(val)
        })
    })
}

module.exports = {
    redisClient,
    setRedis,
    getRedis
}