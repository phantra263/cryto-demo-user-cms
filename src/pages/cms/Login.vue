<template>
    <div class="page-login">
        <div class="wrap-content">
            <h1>Login</h1>
            <a-form :model="formState" :label-col="{ span: 4 }" name="basic" autocomplete="off" @finish="onFinish"
                @finishFailed="onFinishFailed" class="form-login">
                <a-form-item label="Username" name="username"
                    :rules="[{ required: true, message: 'Please input your username!' }]">
                    <a-input v-model:value="formState.username" />
                </a-form-item>

                <a-form-item label="Password" name="password"
                    :rules="[{ required: true, message: 'Please input your password!' }]">
                    <a-input-password v-model:value="formState.password" />
                </a-form-item>

                <a-button type="primary" html-type="submit" style="display: table; margin: auto;">Login</a-button>
            </a-form>
        </div>

    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Cookie from 'js-cookie';
import { message } from 'ant-design-vue';


const HARD_CODE_DATA = [
    {
        username: 'admin',
        password: 'Password1!',
        role: 'admin'
    },
    {
        username: 'admin2',
        password: 'Password2!',
        role: 'user'
    }
]
const router = useRouter();
const formState = reactive({
    username: '',
    password: ''
});
const onFinish = values => {
    if ((values.username == HARD_CODE_DATA[0].username && values.password == HARD_CODE_DATA[0].password) ||
        (values.username == HARD_CODE_DATA[1].username && values.password == HARD_CODE_DATA[1].password)) {
        values = values.username == HARD_CODE_DATA[0].username ? HARD_CODE_DATA[0] : HARD_CODE_DATA[1];
        message.success('Login success!');
        Cookie.set("access_token", JSON.stringify(values));
        router.push({ name: 'admin' })
    } else message.error('Username or password incorrect!');
};
</script>

<style scoped lang="scss">
.page-login {
    min-height: 100vh;
    display: flex;
    background-image: url('../assets/tecnology.jpg');
    background-size: cover;

    @media screen and (max-width: 768px) {
        padding: 0 15px;
    }

    .wrap-content {
        max-width: 550px;
        margin: auto;
        width: 100%;
        border: 1px solid #eee;
        padding: 20px;
        background: #236871;
        border-radius: 10px;

        h1 {
            text-align: center;
            color: #fff;
        }
    }

    .form-login {
        width: 100%;

        .ant-form-item {
            margin-bottom: 10px;
        }

        :deep(.ant-form-item-label > label) {
            color: #fff;
        }
    }
}
</style>