<template>
    <header>
        <div class="container">
            <div class="wrap-header">
                <router-link to="/"><img src="../assets/banner-bitcoin.png" class="logo" alt="logo"></router-link>
                <!-- <nav class="menu-header">
                    <a href="/html/">type1</a>|
                    <a href="/css/">type2</a>|
                    <a href="/js/">type3</a>|
                    <a href="/python/">type4</a>
                </nav> -->
                <form class="form-search" @submit="handleSearch">
                    <input type="text" v-model="keySearch">
                    <button type="submit">
                        <SearchOutlined />
                    </button>
                </form>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
    SearchOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const keySearch = ref('');
const handleSearch = (e) => {
    e.preventDefault();
    console.log(keySearch.value);
    router.replace({ path: '/list/0/all', query: { keysearch: keySearch.value } });
}
</script>
<style scoped lang="scss">
header {
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgb(24, 26, 32);

    .wrap-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0 10px;

        .logo {
            width: 110px;
            height: 60px;
            object-fit: cover;
        }

        // .menu-header {
        //     a {
        //         padding: 10px;
        //         color: #EAECEF;

        //         &:hover,
        //         &.active {
        //             color: #F0B90B;
        //         }
        //     }
        // }
        .form-search {
            width: 40%;
            display: flex;
            align-items: center;

            input {
                flex: 1;
                height: 35px;
                border: 0;
                outline: none;
                color: #fff;
                padding: 10px 0 10px 10px;
                background: #3a393b;
                font-size: 14px;
                border-radius: 5px 0 0 5px;
            }

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 25px;
                height: 35px;
                background: #3a393b;
                border-radius: 0;
                border-radius: 0 5px 5px 0;
            }
        }
    }
}
</style>