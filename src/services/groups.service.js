import http from "../http-common";
const endpoint = "/groups";

const groups = {
    getAll() {
        return http.get(endpoint);
    },
    getById(id) {
        return http.get(`${endpoint}/${id}`);
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

export default groups;
