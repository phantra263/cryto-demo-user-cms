import http from "../../http-common";
const endpoint = "/user";

const home = {
    getPostType() {
        return http.get(`${endpoint}/types`);
    },
    getListPost(params) {
        return http.get(`${endpoint}/entities`, { params });
    }
}

export default home;
