import request from "./request";
import store from "@/store/index.js";

export const fetchUserRegister = (payload) =>
    // axios.post('/register',payload)   
    request.post("/register", payload)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
        });

export const fetchUserLogin = (payload) => {
    return request.post("/alogin", payload)
        .then(function (response) {
            window.localStorage["token"] = JSON.stringify(response.data.token);
            store.setUserInfo(response.data.userInfo)
            store.setLoginStatus(response.isLogin)
            console.log("response",response)
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}