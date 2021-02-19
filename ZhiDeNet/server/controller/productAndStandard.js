//产品与服务模块
const productList=require('../data.json').products //产品数据列表

//首页 下拉服务数据 可去掉
const byteStandards=require('../data.json').byteStandards


module.exports={
    queryProducts(req,res){
        res.json(productList)
    },
    queryByteStandards(req,res){
        res.json(byteStandards)
    }
}