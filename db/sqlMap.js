var sqlMap = {
    //用户类
    user: {
        //用户登录
        select: 'select * from users where username=? and password=?',
        //用户注册
        checkName: 'select * from users where username=?',
        regist: 'insert into users (username, password) values (?, ?)',
        //用户修改密码
        check: 'select password from users where username=?',
    },
    //商品类
    shop: {
        //兴趣课程
        interest: 'select * from interest_class',
        //年龄段
        age: 'select * from age_class',
        //价格区间
        price: 'select * from price_class',
        //查询课程列表
        classMsg: 'select * from class',
        //查询销量前四课程
        hotClass: 'SELECT * FROM class order by sale_num desc limit 0,4',
        //按照id查找课程
        nowClassMsg: 'select * from class where id=?',
        //模糊查找商品名称
        className: 'SELECT * FROM class WHERE c_name LIKE "%"?"%"'
    }
}

module.exports = sqlMap;