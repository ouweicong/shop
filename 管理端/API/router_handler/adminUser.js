//导入数据库操作模块
const db = require('../db/index')
const sql = 'SELECT * FROM admin WHERE adminName=?'
const jwt = require('jsonwebtoken')    //导入Token生成的依赖包
const config = require('../加密Token字符串')  //导入加密配置文件


exports.login = (req, res) => {
    db.query(sql, req.body.adminName, (err, results) => {
        if (err) {
            return res.send({
                sataus: 1,
                msg: err.message
            })
        } else if (results.length != 1) {
            return res.send({
                status: 1,
                msg: '该用户不存在!'
            })
        }
        if (results[0].password != req.body.password) {
            return res.send({
                status: 1,
                msg: '账号或密码不符，登录失败!'
            })
        }
        if (results[0].password == req.body.password) {
            const adminUser = { ...results[0], password: '', adminName: '' }
            // console.log(adminUser)
            const tokenStr = jwt.sign(adminUser, config.jwtSecreKey, {
                expiresIn: '2h'   // token 有效期2小时
            })

            res.send({
                status: 0,
                msg: '登陆成功!',
                token: 'Bearer ' + tokenStr,     //token前面必须加上“Bearer空格”
            })
        }
        // console.log(req.body.password)
        // console.log(req.body.adminName)
        // console.log(results[0])
    })
}

exports.getmsg = (req, res) => {
    db.query('SELECT * FROM admin', (err, result) => {
        if(err){
            return res.send({
                status:1,
                msg: err.message
            })
        }
        res.send({
            status: 0,
            msg: '登陆成功!',
            data: result
        })
    })
}