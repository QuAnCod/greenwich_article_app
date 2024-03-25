import axios from "axios"

export class BaseService {
    post = (url, data) => {
        return axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    get = (url) => {
        return axios({
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    put = (url, data) => {
        return axios({
            method: "PUT",
            url: url,
            data: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }
}