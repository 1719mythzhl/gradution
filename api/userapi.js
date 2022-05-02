const db = require('../db/db')
const $sql = require('../db/sqlMap');
const express = require('express');
const mysql = require('mysql');
const app = express()

const conn = mysql.createConnection(db.mysql);
conn.connect();

//安装并导入 JWT 相关的两个包
const jwt = require('jsonwebtoken') //将用户信息生成一个jsonwebtoken的字符串
const expressJWT = require('express-jwt') //将jsonwebtoken字符串再解析还原成用户信息

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())


// 解析 post 表单数据的中间件
const bodyParser = require('body-parser');
const req = require('express/lib/request');
// 解析 POST 提交过来的表单数据
app.use(bodyParser.urlencoded({ extended: false }))

//定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'itheima No1 ^_^'
//注册将 JWT 字符串解析还原成 JSON 对象的中间件
//注意：只要配置成功了express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到req.user属性上
//1.使用app.use()来注册中间件
//2.express.JWT({secret: secretKey}) 用来解析Token的中间件
//3..unless({path:[/^\/\api\//]})用来指定哪些接口不需要访问权限
app.use(expressJWT({secret: secretKey}).unless({path:[/^\/api\//] }))

//登录接口
app.post('/api/login', (req, res) => {
    let uname = req.body.username
    let pwd = req.body.password
    let sqlStr = $sql.user.select
    conn.query(sqlStr,[uname, pwd], (err, result) => {
        if(err) 
            return res.send({
                code: 500,
                message:err.message
            })
        if(result.length == 0) {
            return res.send({
                code: 1,
                message: '用户名或密码错误'
            })
        }
        // 登录成功
        // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
        // 参数1:用户的信息对象
        // 参数2:加密的秘钥
        // 参数3:配置对象，可以配置当前token的有效期
        // 记住：千万不要把密码加密到token字符串
        const tokenStr = jwt.sign({username: uname}, secretKey, {expiresIn: '1800s'})
        return res.send({
            code: 0,
            message: '登录成功',
            token: tokenStr,
            name: uname
        })
        
    })
})

//注册接口
app.post('/api/regist', (req, res) => {
  conn.query($sql.user.checkName, [ req.body.username ], (err, result) => {
    // console.log(req.body.username)
    if(err) 
        return res.send({
            code: 500,
            message:err.message
        })
        if(result.length != 0) {
            return res.send({
                code: 1,
                message: '用户名以被注册，请更换用户名'
        })
    }
    conn.query($sql.user.regist, [ req.body.username, req.body.password ] , (err, result) => {
      return res.send({
        code: 0,
        message: '注册成功'
      })
    })
    
  })
})

//注销接口
app.post('/api/loginout', (req, res) => {
  if(err) return res.send({
    code: 500,
    message: err.message
  })
  return res.send({
    code: 200,
    messgae: '退出登录成功'
  })
})

// ----------------------------------------------
// /api/shop开头
const url2 = '/api/shop/'
//获取科目类型
app.get(url2 + 'interest', (req, res) => {
  conn.query($sql.shop.interest, (err, result) => {
    if(err) return res.send({
      code: 500,
      message: err.message
    })
    res.send(result)
  })
})

//获取年龄段
app.get(url2 + 'age', (req, res) => {
  conn.query($sql.shop.age, (err, result) => {
    if(err) return res.send({
      code: 500,
      message: err.message
    })
    res.send(result)
  })
})

//获取价格区间
app.get(url2 + 'price', (req, res) => {
  conn.query($sql.shop.price, (err, result) => {
    if(err) return res.send({
      code: 500,
      message: err.message
    })
    res.send(result)
  })
})

//根据分类查询课程信息
app.post(url2 + 'classList', (req, res) => {
  conn.query($sql.shop.classMsg, (err, result) => {
    if(err) return res.send({
      code: 500,
      message: err.message
    })
    result.forEach(element => {
      element.c_promotion = element.c_promotion.split(';')
      element.c_promotion_content = element.c_promotion_content.split(';')
      element.img_swiper = element.img_swiper.split(';')
      element.img_content = element.img_content.split(';')
    });
    res.send(result)
  })
})


//查询销量最高的四个课程
app.get(url2 + 'hotClass', (req, res) => {
  conn.query($sql.shop.hotClass, (err, result) => {
    if(err) return res.send({
      code: 500,
      message: err.message
    })
    result.forEach(element => {
      element.img_swiper = element.img_swiper.split(';')
      element.img_content = element.img_content.split(';')
    })
    res.send(result)
  })
})

//根据id查找课程
app.get(url2 + 'nowClassMsg', (req, res) => {
  conn.query($sql.shop.nowClassMsg, [req.query.id], (err, result) => {
    if(err) return res.send({
      code: 500,
      message: err.message
    })
    result.forEach(element => {
      element.img_swiper = element.img_swiper.split(';')
      element.img_content = element.img_content.split(';')
      element.c_promotion = element.c_promotion.split(';')
      element.c_promotion_content = element.c_promotion_content.split(';')
    })
    res.send(result)
  })
})

//模糊查询商品名称
app.get(url2 + 'className', (req, res) => {
  console.log(req)
  conn.query($sql.shop.className, [req.query.name], (err, result) => {
    if(err) return res.send ({
      code: 500,
      message: err.message
    })
    result.forEach(element => {
      element.img_swiper = element.img_swiper.split(';')
      element.img_content = element.img_content.split(';')
    })
    res.send(result)
  })
})

//------------------------------------------------
// 需要权限接口(如购买课程)
// jwt.verify解析token
//获取课程信息(有权限)
app.get('/admin/getClass', function (req, res) {
    console.log(req.user)
    res.send({
      status: 200,
      message: '获取用户信息成功！',
      data: req.user, // 要发送给客户端的用户信息
    })
  })


// 使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
    // token解析失败(如：token过期)
    if(err.name === 'UnauthorizedError') {
      return res.send({
        status: 401,
        message: '无效的token'
      })
    }
    res.send({
      status: 500,
      message: '未知的错误'
    })
})

app.listen(80, function() {
    console.log('Express server running at http://127.0.0.1:80')
})