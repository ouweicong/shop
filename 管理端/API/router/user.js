const express = require('express')

const router = express.Router()

const userHandler = require('../router_handler/user')

router.get('/getUser',userHandler.getUser)
router.get('/getAdminUser',userHandler.getAaminUser)
router.get('/searchUserMsg',userHandler.searchUser)
router.get('/searchAdminUserMsg',userHandler.searchAdminUser)
router.get('/db_COLUMN_NAME',userHandler.db_COLUMN_NAME)
router.get('/db_admin_COLUMN_NAME',userHandler.db_admin_COLUMN_NAME)

module.exports = router