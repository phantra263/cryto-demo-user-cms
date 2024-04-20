import http from "../http-common";
import { loading } from "../http-common";
const endpoint = "/account-infos";

const accounts = {
    getAll(params) {
        loading.value = true;
        return http.get(endpoint, { params }).finally(() => {
            loading.value = false; // Ẩn hiệu ứng loading sau khi nhận được phản hồi hoặc gặp lỗi
        });
    },
    update(id, data) {
        loading.value = true;
        return http.put(`${endpoint}/${id}`, data).finally(() => {
            loading.value = false; // Ẩn hiệu ứng loading sau khi nhận được phản hồi hoặc gặp lỗi
        });
    },
    delete(id) {
        return http.delete(`${endpoint}/${id}`);
    }
}

export default accounts;
