const express = require('express')

const router = express.Router()

const adminUserHandler = require('../router_handler/adminUser')

router.post('/postAdmin',adminUserHandler.login)

router.get('/getAdminMsg',adminUserHandler.getmsg)

module.exports = router