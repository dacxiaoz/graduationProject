const router = require("express").Router();

const staffStoryController=require('./controller/staff-stories')
const jobController=require('./controller/jobs')
const productAndStandardController=require('./controller/productAndStandard')
const userController = require('./controller/user')
const resumeController = require('./controller/resume')

// staff stories routes 员工故事路由 走 data.json
router.get('/staff-stories',staffStoryController.queryList)
router.get('/staff-stories/:id',staffStoryController.queryOne)

// jobs routes 和 职位路由 走接口
router.post("/jobs", jobController.queryList);
// 职位详情页 路由 走接口
router.get("/jobs/:id", jobController.queryOne);

//职位过滤路由  走接口
router.get("/job-filters",jobController.queryFilters);
//职位类型路由  走接口
router.get("/job-categories",jobController.queryJobCategoryList);

// product and byteStandard 产品与服务路由 走data.json
router.get('/products',productAndStandardController.queryProducts)

// 首页的 分页路由(往下滑动的一些数据) 走data.json
router.get('/byte-standards',productAndStandardController.queryByteStandards)


//自己写的后端路由
//注册
router.post('/register',userController.registerMethods)
//登陆
router.post('/alogin',userController.loginMethods)

router.post('/aresume',resumeController.querResume)

router.post('/editResume',resumeController.editResume)

module.exports = router;
