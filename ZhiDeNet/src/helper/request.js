import axios from "axios";

const instance = axios.create({ baseURL: "/api" });

// axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
instance.interceptors.response.use(
  response => {
    const { status, data } = response;

    if (data.errno === 999) {
      router.replace('/');
      console.log("token过期");
    }
    if (status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(response.data);
  },
  error => Promise.reject(error)
);

// http request 拦截器 特定路由状态 设置token
instance.interceptors.request.use(
  request => {
    if (localStorage.token) { //判断token是否存在
      request.headers.Authorization = localStorage.token;  //将token设置成请求头
    }
    return request;
  },
  err => {
    return Promise.reject(err);
  }
)
export default instance;
