//1. 导入mysql模块
// const mysql = require('mysql')

// const db = mysql.createPool({
//     host: '127.0.0.1', //数据库的IP地址
//     port: 3307,
//     user: 'root', //登录数据库账号
//     password: 'admin123', //登录数据库密码
//     database: 'bdg_database', //指定要操作哪个数据库
// })

// module.exports = db

module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'admin123',
        port: '3307',
        database: 'bdg_database'
    }
}