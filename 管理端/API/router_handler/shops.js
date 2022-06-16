const db = require('../db/index')


exports.getShops = (req, res) => {
    db.query('SELECT * FROM shops', (err, result) => {
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

exports.searchShops = (req, res) => {
    db.query("SELECT * FROM shops WHERE " + req.query.one + "=?", [req.query.two], (err, result) => {
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
    db.query("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'db_shop' AND TABLE_NAME = 'shops'", (err, result) => {
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

exports.getGoods = (req,res) => {
    db.query('SELECT * FROM goods',(err, result) => {
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

exports.searchGoodsMsg = (req, res) => {
    db.query('SELECT * FROM goods WHERE ' + req.query.one + '=?', [req.query.two], (err, result) => {
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

exports.db_goods_COLUMN_NAME = (req, res) => {
    db.query("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = 'db_shop' AND TABLE_NAME = 'goods'", (err, result) => {
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
