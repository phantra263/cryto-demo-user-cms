import http from "../../http-common";
const endpoint = "/cms/tags";

const tagCMS = {
    getAll() {
        return http.get(endpoint);
    },
    create(data) {
        return http.post(endpoint, data);
    },
    delete(id) {
        return http.delete(`${endpoint}/${id}`);
    },
    update(id, data) {
        return http.put(`${endpoint}/${id}`, data);
    }
}

export default tagCMS;
