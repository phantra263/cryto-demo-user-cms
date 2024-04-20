<template>
    <!-- Table post type -->
    <h2>Quản lý post type:</h2>
    <div class="control-header">
        <span>Tổng số: <a-badge count="25" /></span>
        <a-button type="primary" @click="openModal('create')">Add</a-button>
    </div>
    <TableCMS :columns="columnsPostType" :data="dataPostType" />

    <!-- Modal -->
    <ModalCMS :showModal="showModal" @close-modal="handleCloseModal" :titleModal="'Infor post type'"
        @submit="handleSubmit">
        <a-form :model="formState" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 20 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Type post" name="name"
                :rules="[{ required: true, message: 'Please input type post name!' }]">
                <a-input v-model:value="formState.name" />
            </a-form-item>
        </a-form>
    </ModalCMS>
</template>
<script setup>
import { ref, reactive } from 'vue';
import TableCMS from '../../components/TableCMS.vue';
import ModalCMS from '../../components/ModalCMS.vue';

let formState = reactive({
    name: '',
});
const dataPostType = [
    {
        "id": 1,
        "name": "Tạ Đức Lộc",
        "slug": "ta-duc-loc",
        "is_show": 1,
        "created_at": "2024-04-11T13:49:24.000000Z",
        "updated_at": "2024-04-11T13:49:24.000000Z"
    },
    {
        "id": 2,
        "name": "Test1",
        "slug": "test1",
        "is_show": 1,
        "created_at": "2024-04-11T13:50:30.000000Z",
        "updated_at": "2024-04-11T13:50:30.000000Z"
    },
    {
        "id": 3,
        "name": "Test13",
        "slug": "test13",
        "is_show": 1,
        "created_at": "2024-04-11T13:51:38.000000Z",
        "updated_at": "2024-04-11T13:51:38.000000Z"
    }
];
const columnsPostType = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: 60
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200
    },
    {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
    },
    {
        title: 'Is show',
        dataIndex: 'is_show',
        key: 'is_show',
    },
    {
        title: 'Created at',
        key: 'time',
        dataIndex: 'created_at',
    },
    {
        title: 'Updated at',
        dataIndex: 'updated_at',
        key: 'time'
    },
    {
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 80
    }
];
const showModal = ref(false);

const openModal = (type) => {
    console.log(showModal.value);
    showModal.value = true;
}
const handleCloseModal = () => {
    showModal.value = false; // Cập nhật showModal khi đóng modal
};

const handleSubmit = () => {
    console.log("Uploading files:", formState);
};
</script>
<style lang="scss" scoped>
.control-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>