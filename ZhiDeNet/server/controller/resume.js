let path = require('path')
let fs = require('fs');

const writeResumeData = (params, callback) => {
    fs.readFile(path.join(__dirname, '../db/resume.json'), "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }
        let newdata = JSON.parse(data); //读取的data文件 转换为json对象
        let resumeDetail = newdata.data.filter((item) => {
            return item.id === params.id
        })

        if (resumeDetail.length != 0) {
            callback(resumeDetail[0])
        } else {
            let newCrateResume = {
                id: "",
                resumeDetail: [
                    {
                        award_list: [],
                        career_list: [],
                        education_list: [],
                        email: "2495308304@qq.com",
                        id: "82727490559111eb8f1e83e8efe298fe",
                        internship_list: [],
                        language_skill_list: [],
                        mobile_number: "15972374667",
                        name: "张成诚",
                        project_list: [],
                        sns_list: [],
                        works_list: []
                    }
                ]
            }
            newCrateResume.id = params.id
            newdata.data.push(newCrateResume)
            let str = JSON.stringify(newdata);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(path.join(__dirname, '../db/resume.json'), str, "utf8", (err) => {
                if (err) {
                    console.error(err);
                }
                callback(newCrateResume)
            })
        }
    })
}

//编辑简历保存到resume.json文件中
const editResume = (params, callback) => {

    fs.readFile(path.join(__dirname, '../db/resume.json'), "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }
        let newdata = JSON.parse(data); //读取的data文件 转换为json对象
        let resumeDetailIndex = newdata.data.findIndex((item) => {
            return item.id === params.id
        })
        if (resumeDetailIndex === '-1') {
            newdata.data.resumeDetail.push(params)
        } else {
            newdata.data[resumeDetailIndex].resumeDetail = params
        }
        let str = JSON.stringify(newdata);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(path.join(__dirname, '../db/resume.json'), str, "utf8", (err) => {
            if (err) {
                console.error(err);
            }
            callback(newdata.data[resumeDetailIndex].resumeDetail)
        })
    })
}

module.exports = {
    querResume(req, res) {
        let { body } = req
        let params = body
        writeResumeData(params, (data) => {
            res.json(data)
        })
    },
    editResume(req, res) {
        let { body } = req
        let params = body
        editResume(params, (data) => {
            res.json(data)
        })

    }

}