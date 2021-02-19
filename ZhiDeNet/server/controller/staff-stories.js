const data=require('../data.json').staffStories //获取了data.json 下的 员工故事 数据

module.exports={
    queryList(req,res){
        res.json(data)
    },
    queryOne(req,res){
        const id=parseInt(req.params.id)
        const result=data.find(item=>item.id===id)
        res.json(result)
    }
}