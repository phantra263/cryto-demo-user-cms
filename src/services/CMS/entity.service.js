import http from "../../http-common";
import Cookie from 'js-cookie'

const endpoint = "/cms/entities";
const token = Cookie.get("access_token");
const entityCMS = {
    getAll(params) {
        return http.get(endpoint, { params });
    },
    create(data) {
        return http.post(endpoint, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`
            }
        });
    },
    delete(id) {
        return http.delete(`${endpoint}/${id}`);
    },
    update(id, data) {
        return http.put(`${endpoint}/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `${token}`
            }
        });
    }
}

export default entityCMS;
