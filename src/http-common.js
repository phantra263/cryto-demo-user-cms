import axios from "axios";
import Cookie from 'js-cookie'

const token = Cookie.get("access_token");
export default axios.create({
    baseURL: 'http://localhost:8088/api',
    headers: {
        "Content-type": "multipart/form-data",
        "Authorization": "Bearer " + token
    }
});