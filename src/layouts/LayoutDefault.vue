<template>
    <div class="layout-user" :style="{ paddingBottom: showBannerBottom ? '150px' : '' }">
        <Header />
        <main>
            <RouterView />
        </main>
        <Footer />

        <!-- modal advertising -->
        <ModalAdvUser />
    </div>
    <!-- banner advertising footer-->
    <div class="banner-footer container" v-if="showBannerBottom">
        <img src="https://www.shutterstock.com/image-illustration/digital-cryptocurrency-block-chain-market-600nw-1939827760.jpg"
            alt="" class="banner-advertising" />
        <button class="btn-close" @click="showBannerBottom = false">
            <CloseOutlined />
        </button>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import ModalAdvUser from '../components/ModalAdvUser.vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const showBannerBottom = ref(true);
const router = useRouter();

watch(() => router.currentRoute.value,
    (to, from) => {
        showBannerBottom.value = true;
    }
);
</script>

<style scoped lang="scss">
.banner-footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 100;

    img {
        width: 100%;
        height: 110px;
        object-fit: cover;
    }

    .btn-close {
        position: absolute;
        top: -8px;
        right: 5px;
        background: #fff;
        border: 0;
        padding: 3px;
        color: #1c1c1c;
    }
}
</style>