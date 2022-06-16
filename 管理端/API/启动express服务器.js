const express = require('express')

const app = express()


const cors = require('cors')
app.use(cors())//处理跨域问题


app.use(express.urlencoded({extended: false}))


//一定在路由之前配置解析 token 的中间件
const expressJWT = require('express-jwt')
const config = require('./加密Token字符串')     //解析密钥
app.use(expressJWT({secret: config.jwtSecreKey}).unless({path:'/api/postAdmin'}))   //注册中间件，可以加unless指定不需要验证的api路径


const adminUserRouter = require('./router/adminUser')
app.use('/api',adminUserRouter)             //注册路由（登录管理员所需token接口）

const userMsg = require('./router/user')
app.use('/api',userMsg)                //注册路由（获取用户信息接口）

const shops = require('./router/shops')
app.use('/shops_api',shops)             //注册路由（获取商品管理信息接口）



app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401).send({status:1,msg:'身份认证失败'})
    }
})

app.listen(3000, function (){
    // console.log('Express serve running at http://127.0.0.1')
})