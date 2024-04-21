<template>
    <a-modal v-model:open="open" :footer="null" class="model-custom">
        <img src="https://www.shutterstock.com/image-illustration/digital-cryptocurrency-block-chain-market-600nw-1939827760.jpg"
            alt="" class="banner-advertising" />
    </a-modal>
</template>
<script setup>
import { ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const open = ref(true);
const router = useRouter();

watch(() => router.currentRoute.value,
    (to, from) => {
        open.value = true;
    }
);
</script>
<style lang="scss" scoped>
.model-custom {
    .banner-advertising {
        width: 100%;
        object-fit: cover;
        max-height: 300px;
    }
}
</style>