const db = require('../db/index')

exports.getUser = (req,res) => {
    db.query('SELECT * FROM user',(err, result) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        res.send({
            status: 0,
            msg: '获取成功!',
            data: result
        })
    })
}
exports.getAaminUser = (req,res) => {
    db.query('SELECT * FROM admin',(err, result) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        res.send({
            status: 0,
            msg: '获取成功!',
            data: result
        })
    })
}

exports.searchUser = (req, res) => {
    db.query('SELECT * FROM user WHERE ' + req.query.one + '=?', [req.query.two], (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        if (result == 0) {
            res.send({
                status: 0,
                msg: '未找到该信息!',
                data: result
            })
        } else {
            res.send({
                status: 0,
                msg: '查询成功!',
                data: result
            })
        }
    })
}
exports.searchAdminUser = (req, res) => {
    db.query('SELECT * FROM admin WHERE ' + req.query.one + '=?', [req.query.two], (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        if (result == 0) {
            res.send({
                status: 0,
                msg: '未找到该信息!',
                data: result
            })
        } else {
            res.send({
                status: 0,
                msg: '查询成功!',
                data: result
            })
        }
    })
}

exports.db_COLUMN_NAME = (req, res) => {
    db.query("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'db_shop' AND TABLE_NAME = 'user'", (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        res.send({
            status: 0,
            msg: '查询成功!',
            data: result
        })
    })
}
exports.db_admin_COLUMN_NAME = (req, res) => {
    db.query("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'db_shop' AND TABLE_NAME = 'admin'", (err, result) => {
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        res.send({
            status: 0,
            msg: '查询成功!',
            data: result
        })
    })
}