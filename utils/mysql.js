const mysql = require('mysql');
const { host, user, password, port } = require('../conf/jm');

const mysqlQuery = (database,sql,params,fn) => {
    const connection = mysql.createConnection({ host, user, password, port, database });
    connection.connect((err) => {
        if(err){
            console.log("数据库连接失败",err);
            return;
        }
    });
    connection.query(sql,params,fn)
    connection.end();
}
module.exports = async (sql = '',params = [] ) => (await new Promise((resolve,reject)=>{
        mysqlQuery('private_library',sql,params,(err,result)=> {
            if(err){
                console.log("数据库操作失败",err);
                return;
            } else {
                resolve(result);
            }
        })
    }));


