import request from "./request";

export const fetchResumeData = (payload) => {
    return request.post("/aresume", payload)
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const fetchResumeEditData = (payload) => {
    return request.post("/editResume", payload)
        .then(function (response) {   
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}