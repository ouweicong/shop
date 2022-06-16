const express = require('express')

const router = express.Router()

const shopsHandler = require('../router_handler/shops')

router.get('/getShops',shopsHandler.getShops)
router.get('/searchShopsMsg',shopsHandler.searchShops)
router.get('/db_COLUMN_NAME',shopsHandler.db_COLUMN_NAME)
router.get('/getGoods',shopsHandler.getGoods)
router.get('/searchGoodsMsg',shopsHandler.searchGoodsMsg)
router.get('/db_goods_COLUMN_NAME',shopsHandler.db_goods_COLUMN_NAME)


module.exports = router