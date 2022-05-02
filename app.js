const express = require('express')

const app = express()

app.all("/*", function(req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})

app.get('/', (req, res) => {
    res.send('Hello World get')
})

app.get('/login', (req, res) => {
    res.send('登录页面')
})

app.post('/', (req, res) => {
    res.send('post----')
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/')
})