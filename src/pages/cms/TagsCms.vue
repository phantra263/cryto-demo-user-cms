<template>
    <!-- Table post type -->
    <h2>Quản lý tags:</h2>
    <div class="control-header">
        <span>Tổng số: <a-badge :count="total" /></span>
        <a-button type="primary" @click="openModal">Add</a-button>
    </div>
    <a-spin :spinning="loading">
        <TableCMS :columns="columnsTag" :scroll="1000" :data="listTags" @update="handleUpdate" @delete="handleDelete" />
    </a-spin>
    <!-- Modal -->
    <ModalCMS :showModal="showModal" @close-modal="handleCloseModal" :titleModal="'Infor tag name'">
        <a-spin :spinning="loading">
            <a-form ref="formRef" :model="formState" name="basic" :label-col="{ span: 0 }" :wrapper-col="{ span: 20 }"
                autocomplete="off" @finish="onFinish">
                <a-form-item label="Tag name" name="name"
                    :rules="[{ required: true, message: 'Please input tag name' }]">
                    <a-input v-model:value="formState.name" />
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
import TagsSrv from '../../services/CMS/tag.service';
import { message } from 'ant-design-vue';


let formState = reactive({
    id: '',
    name: '',
});
const loading = ref(false);
const showModal = ref(false);
const listTags = ref([]);
const formRef = ref(null);
const flagUpdate = ref(false);
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
const total = ref(0);

const getTags = async () => {
    loading.value = true;
    try {
        const res = await TagsSrv.getAll();
        if (res.data.success) {
            listTags.value = res.data.data;
            total.value = listTags.value.length;
        }
    } catch (error) {
        console.error('Error fetching tag:', error);
    } finally {
        loading.value = false;
    }
};

const openModal = () => {
    showModal.value = true;
}
const handleCloseModal = () => {
    resetFormValidation();
    showModal.value = false; // Cập nhật showModal khi đóng modal
};

const handleUpdate = async (data) => {
    flagUpdate.value = true;
    formState.name = data.name;
    formState.id = data.id;
    showModal.value = true;
}

const resetFormValidation = () => {
    const form = formRef.value;
    form.resetFields();
    formState = {
        id: '',
        name: ''
    }
    flagUpdate.value = false;
};

const onFinish = async () => {
    loading.value = true;
    try {
        if (!flagUpdate.value) {
            await createTags(formState);
        } else {
            await updateTag(formState);
        }
        message.success(flagUpdate.value ? 'Update success!' : 'Create success!');
        handleCloseModal();
        getTags();
    } catch (error) {
        message.error(flagUpdate.value ? 'Update fail!' : 'Create fail!');
        console.error(`Error ${flagUpdate.value ? 'update' : 'create'} tags:`, error);
    } finally {
        loading.value = false;
    }
}

const handleDelete = async (id) => {
    loading.value = true;
    try {
        const res = await TagsSrv.delete(id);
        if (res.data.success) {
            getTags();
        }
    } catch (error) {
        console.error('Error delete record:', error);
    } finally {
        loading.value = false;
    }
}

const createTags = async (formData) => {
    const res = await TagsSrv.create(formData);
    if (!res.data.success) {
        throw new Error('Create failed');
    }
};

const updateTag = async (formData) => {
    const res = await TagsSrv.update(formData.id, formData);
    if (!res.data.success) {
        throw new Error('Update failed');
    }
};

onMounted(() => {
    getTags();
});

</script>
<style lang="scss" scoped>
.control-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
</style>