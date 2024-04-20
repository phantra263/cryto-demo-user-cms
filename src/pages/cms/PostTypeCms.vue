<template>
    <!-- Table post type -->
    <h2>Quản lý post type:</h2>
    <div class="control-header">
        <span>Tổng số: <a-badge :count="total" /></span>
        <a-button type="primary" @click="openModal">Add</a-button>
    </div>
    <a-spin :spinning="loading">
        <TableCMS :columns="columnsPostType" :scroll="1000" :data="listPostType" @update="handleUpdate"
            @delete="handleDelete" />
    </a-spin>

    <!-- Modal -->
    <ModalCMS :showModal="showModal" @close-modal="handleCloseModal" :titleModal="'Infor post type'">
        <a-spin :spinning="loading">
            <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }"
                autocomplete="off" @finish="onFinish">
                <a-form-item label="Type post" name="name"
                    :rules="[{ required: true, message: 'Please input type post name!' }]">
                    <a-input v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="Show" name="is_show">
                    <a-switch v-model:checked="formState.is_show" />
                </a-form-item>

                <div style="display: flex; justify-content: flex-end">
                    <a-button html-type="button" @click="handleCloseModal">Cancel</a-button>
                    <a-button type="primary" html-type="submit" style="margin-left: 5px;">Submit</a-button>
                </div>
            </a-form>
        </a-spin>

    </ModalCMS>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import TableCMS from '../../components/TableCMS.vue';
import ModalCMS from '../../components/ModalCMS.vue';
import PostTypeSrv from '../../services/CMS/postType.service';
import { message } from 'ant-design-vue';

let formState = reactive({
    id: '',
    name: '',
    is_show: true
});
const loading = ref(false);
const listPostType = ref([]);
const formRef = ref(null);
const flagUpdate = ref(false);
const showModal = ref(false);
const total = ref(0);
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
        key: 'switch',
        align: 'center',
        width: 80
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

const openModal = () => {
    showModal.value = true;
}
const handleCloseModal = () => {
    resetFormValidation();
    showModal.value = false; // Cập nhật showModal khi đóng modal
};

const resetFormValidation = () => {
    const form = formRef.value;
    form.resetFields();
    formState = {
        id: '',
        name: '',
        is_show: true
    }
    flagUpdate.value = false;
};

const handleUpdate = async (data) => {
    flagUpdate.value = true;
    formState.name = data.name;
    formState.id = data.id;
    formState.is_show = data.is_show ? true : false;
    showModal.value = true;
}

const handleDelete = async (id) => {
    loading.value = true;
    try {
        const res = await PostTypeSrv.delete(id);
        if (res.data.success) {
            getPostType();
        }
    } catch (error) {
        console.error('Error delete record:', error);
    } finally {
        loading.value = false;
    }
}

const onFinish = async () => {
    loading.value = true;
    try {
        if (!flagUpdate.value) {
            await createPostType(formState);
        } else {
            await updatePostType(formState);
        }
        message.success(flagUpdate.value ? 'Update success!' : 'Create success!');
        getPostType();
        handleCloseModal();

    } catch (error) {
        message.error(flagUpdate.value ? 'Update fail!' : 'Create fail!');
        console.error(`Error ${flagUpdate.value ? 'update' : 'create'} tags:`, error);
    } finally {
        loading.value = false;
    }
}

const createPostType = async (formData) => {
    const res = await PostTypeSrv.create(formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    if (!res.data.success) {
        throw new Error('Create failed');
    }
};

const updatePostType = async (formData) => {
    const res = await PostTypeSrv.update(formData.id, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    if (!res.data.success) {
        throw new Error('Update failed');
    }
};

const getPostType = async () => {
    loading.value = true;
    try {
        const res = await PostTypeSrv.getAll();
        if (res.data.success) {
            listPostType.value = res.data.data;
            total.value = listPostType.value.length;
        }
    } catch (error) {
        console.error('Error fetching tag:', error);
    } finally {
        loading.value = false;
    }
};
onMounted(() => {
    getPostType();
});
</script>
<style lang="scss" scoped>
.control-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>