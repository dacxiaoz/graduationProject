let fs = require('fs');
let path = require('path')
let uuid = require('node-uuid');
// const data = require(path.join(__dirname, '../db/user.json'))
const jwt = require('jsonwebtoken');
//生成唯一的id
let uuid1 = uuid.v1();

function writeJson(params,callback) {
    let message = {}
    //查找数据是否已有相同的邮箱
    fs.readFile(path.join(__dirname, '../db/user.json'), "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }
        let newdata = JSON.parse(data); //读取的data文件 转换为json对象
        let isRegister = newdata.data.findIndex((item) => {
            return item.email === params.email
        })
        if (isRegister == '-1') {  //当账号不相同的时候 进行注册
            params.id = uuid1.replace(/\-/g, "")
            params.resume_detail = {}
            newdata.data.push(params);//将传来的对象push进数组对象中
            newdata.total = newdata.data.length;//定义一下总条数，为以后的分页打基础
            let str = JSON.stringify(newdata);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            //路径需要使用path 作为绝对路径
            fs.writeFile(path.join(__dirname, '../db/user.json'), str, "utf8", (err) => {
                if (err) {
                    console.error(err);
                }
                console.log('----------新增成功-------------');
                message.success = true
                callback(message)
            })
        } else {//当账号相同的时候 提示已注册
            console.log('----------账号已注册-------------'); 
            message.success = false 
            callback(message)
        }
    })
}


const loginJson = (params, req,callback) => {
    let messageData = {
        data: {
            userInfo: {},
            token: ''
        },
        isLogin: true,
        message: '',
        success: true
    }
    fs.readFile(path.join(__dirname, '../db/user.json'), "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }
        let newdata = JSON.parse(data); //读取的data文件 转换为json对象
        //查找数据是否已有相同的邮箱
        let isRegister = newdata.data.filter((item) => {
            return item.email === params.email && item.password === params.password
        })
        //生成token值
        const token = jwt.sign(
            {
                name: req.body //需要放到token的参数
            },
            'suzhen', //随便一点内容，加密的密文，私钥对应着公钥
            {
                expiresIn: 60 * 60 //60分钟到期时间
            }
        )
        if (isRegister.length && isRegister) {
            messageData.data.userInfo = isRegister[0]
            messageData.data.token = token
            messageData.isLogin = true
            messageData.message = '登陆成功'
            messageData.success = true
            callback(messageData)
        }
        else {
            messageData.message = '登陆失败'
            messageData.success = false
            messageData.isLogin = false
            callback(messageData)
        } 
    })
}

// writeJson(params)//执行一下;
module.exports = {
    //用户登陆方法
    loginMethods(req, res) {
        let { body } = req
        let params = body
         //fs是异步操作 需要通过回调拿到fs操作后的数据
        loginJson(params, req,(message)=>{
            res.json(message)
        })
    },
    //用户注册方法
    registerMethods(req, res) {
        let { body } = req
        let params = body
        //fs是异步操作 需要通过回调拿到fs操作后的数据
        writeJson(params,(message)=>{
            res.json(message)
        }) 
    }
}