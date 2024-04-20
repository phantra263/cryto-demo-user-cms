<template>
    <!-- Table post type -->
    <h2>Quản lý tags:</h2>
    <div class="control-header">
        <span>Tổng số: <a-badge count="25" /></span>
        <a-button type="primary" @click="openModal('create')">Add</a-button>
    </div>
    <TableCMS :columns="columnsTag" :data="dataTag" />

    <!-- Modal -->
    <ModalCMS :showModal="showModal" @close-modal="handleCloseModal" :titleModal="'Infor tag name'">
        <a-form :model="formState" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 20 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Tag name" name="name" :rules="[{ required: true, message: 'Please input tag name' }]">
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
const showModal = ref(false);
const dataTag = [
    {
        "id": 1,
        "name": "tag1",
        "created_at": "2024-04-12T16:30:41.000000Z",
        "updated_at": "2024-04-12T16:30:41.000000Z"
    },
    {
        "id": 2,
        "name": "tag2",
        "created_at": "2024-04-12T16:30:46.000000Z",
        "updated_at": "2024-04-12T16:30:46.000000Z"
    },
    {
        "id": 3,
        "name": "tag3",
        "created_at": "2024-04-12T16:30:52.000000Z",
        "updated_at": "2024-04-12T16:30:52.000000Z"
    }
];
const columnsTag = [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: 60
    },
    {
        title: 'Group',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Updated at',
        dataIndex: 'updated_at',
        key: 'time',
    },
    {
        title: 'Created at',
        dataIndex: 'created_at',
        key: 'time',
    },
    {
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: 80
    }
];

const openModal = (type) => {
    console.log(showModal.value);
    showModal.value = true;
}
const handleCloseModal = () => {
    showModal.value = false; // Cập nhật showModal khi đóng modal
};
</script>
<style lang="scss" scoped>
.control-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>