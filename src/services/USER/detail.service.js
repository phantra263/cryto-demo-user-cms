import http from "../../http-common";
const endpoint = "/user";

const detail = {
    getPostById(id) {
        return http.get(`${endpoint}/entities/${id}`);
    }
}

export default detail;
