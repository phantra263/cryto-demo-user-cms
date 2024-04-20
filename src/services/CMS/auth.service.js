import http from "../../http-common";
const endpoint = "/cms/auth/login";

const auth = {
    login(data) {
        return http.post(endpoint, data);
    }
}

export default auth;
