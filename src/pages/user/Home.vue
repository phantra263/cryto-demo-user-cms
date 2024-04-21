<template>
    <div class="container">
        <div class="wrap-content">
            <nav class="menu-header">
                <router-link :to="{ path: `/list/0/all` }">
                    Tất cả
                </router-link>
                <router-link :to="{ path: `/list/${tag.id}/${tag.slug}` }" v-for="(tag, index) in listTags"
                    :key="tag.id">
                    {{ tag.name }}
                </router-link>
            </nav>
            <div class="main-content">
                <div class="content-left">
                    <h2>List post</h2>
                    <div class="list-post">
                        <RouterLink v-if="listPost && listPost.length" :to="{ path: `/detail/${item.id}/${item.slug}` }"
                            class="card-post" v-for="(item, index) in listPost" :key="index">
                            <mark>#{{ item.tag_name }}</mark>
                            <figure>
                                <img :src="item.thumbnail" alt="">
                            </figure>
                            <div class="description">
                                <h3>{{ item.title }}</h3>
                                <!-- <div v-html="item.description" class="content-desc"></div> -->
                            </div>
                        </RouterLink>
                        <a-empty v-else-if="!loading" style="width: 100%;" />
                        <Loading v-if="loading" />
                    </div>
                    <button class="btn-load-more" @click="loadmore" v-if="listPost.length < total">Load more</button>
                </div>

                <div class="content-right">
                    <div class="wrap-content-right">
                        <h2>List favorite</h2>
                        <div class="list-favorite">
                            <RouterLink v-if="listPostFavorite && listPostFavorite.length"
                                :to="{ path: `/detail/${item.id}/${item.slug}` }" class="card-post"
                                v-for="(item, index) in listPostFavorite" :key="index">
                                <mark>#{{ item.tag_name }}</mark>
                                <figure>
                                    <img :src="item.thumbnail" alt="">
                                </figure>
                                <div class="description">
                                    <h3>{{ item.title }}</h3>
                                    <!-- <div v-html="item.description" class="content-desc"></div> -->
                                </div>
                            </RouterLink>
                            <a-empty v-else-if="!loading" />
                            <Loading v-if="loading" />
                        </div>
                        <div class="banner-advertising">
                            <img src="https://picsum.photos/200/300" alt="">
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import HomeSrv from '../../services/USER/home.service'
import Loading from '../../components/Loading.vue';
import { useRoute, useRouter } from 'vue-router';

const listTags = ref([]);
const listPost = ref([]);
const listPostFavorite = ref([]);
const loading = ref(false);
const total = ref(0);
const route = useRoute();
const router = useRouter();
let fetchParams = {
    page: 1,
    per_page: 15,
}

const getTags = async () => {
    try {
        const res = await HomeSrv.getPostType();
        if (res.data.success) {
            listTags.value = res.data.data;
        }
    } catch (error) {
        console.error('Error fetching tag:', error);
    }
};

const getListPost = async () => {
    loading.value = true;
    try {
        const res = await HomeSrv.getListPost(fetchParams);
        if (res.data.success) {
            listPost.value = listPost.value.concat(res.data.data);
            total.value = res.data.pagination.total;
        }
    } catch (error) {
        console.error('Error fetching tag:', error);
    } finally {
        loading.value = false;
    }
};

const getListPostFavorite = async () => {
    loading.value = true;
    const param = {
        filter: {
            is_favorite: 1
        }
    }
    try {
        const res = await HomeSrv.getListPost(param);
        if (res.data.success) {
            listPostFavorite.value = res.data.data;
        }
    } catch (error) {
        console.error('Error fetching tag:', error);
    } finally {
        loading.value = false;
    }
};

const loadmore = () => {
    fetchParams = {
        ...fetchParams,
        page: fetchParams.page + 1
    }
    getListPost();
}

onMounted(() => {
    getTags();
    getListPost();
    getListPostFavorite();
});

watch(() => route.params.id,
    async newId => {
        listPost.value = [];
        fetchParams = {
            ...fetchParams,
            filter: {
                ...fetchParams.filter,
                type_id: newId != 0 ? newId : null,
            }
        }
        await getListPost()
    }
)

watch(() => router.currentRoute.value.query?.keysearch, async (newQuery, oldQuery) => {
    listPost.value = [];
    fetchParams = {
        ...fetchParams,
        filter: {
            ...fetchParams.filter,
            title: newQuery,
        }
    }
    await getListPost()
});
</script>
<style scoped lang="scss">
.wrap-content-right {
    position: sticky;
    top: 85px;
}

.menu-header {
    padding: 15px;
    text-align: center;
    position: sticky;
    top: 80px;
    background: rgb(24, 26, 32);
    z-index: 2;
    font-size: 14px;

    a {
        text-transform: uppercase;
        padding: 10px;
        color: #EAECEF;
        font-weight: bold;


        &:hover,
        &.router-link-active {
            color: #F0B90B;
        }
    }
}

.main-content {
    display: flex;
    gap: 10px;
    padding: 20px 0;

    .content-left {
        width: 70%;

        .card-post {
            width: calc(100% / 3 - 15px);
        }
    }

    .list-post {
        display: flex;
        flex-wrap: wrap;
    }

    .content-right {
        width: 30%;

        .list-favorite {
            .card-post {
                border-radius: 0;
                margin: 0 0 10px;

                img {
                    height: 150px;
                }
            }
        }

        .banner-advertising {
            margin-top: 20px;
            width: 100%;
            object-fit: cover;
            height: 300px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }
    }
}


.btn-load-more {
    display: table;
    margin: 20px auto;
    position: relative;
    padding: 10px 22px;
    border-radius: 6px;
    border: none;
    color: #fff;
    cursor: pointer;
    background-color: #7d2ae8;
    transition: all 0.2s ease;
}

.btn-load-more:active {
    transform: scale(0.96);
}

.btn-load-more:before,
.btn-load-more:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
}

.btn-load-more:hover:before {
    top: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, transparent 20%, #7d2ae8 20%, transparent 30%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%,
        10% 10%, 18% 18%;
    background-position: 50% 120%;
    animation: greentopBubbles 0.6s ease;
}

@keyframes greentopBubbles {
    0% {
        background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
            40% 90%, 55% 90%, 70% 90%;
    }

    50% {
        background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
            50% 50%, 65% 20%, 90% 30%;
    }

    100% {
        background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
            50% 40%, 65% 10%, 90% 20%;
        background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
}

.btn-load-more:hover::after {
    bottom: -70%;
    background-image: radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, #7d2ae8 15%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%),
        radial-gradient(circle, #7d2ae8 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
    background-position: 50% 0%;
    animation: greenbottomBubbles 0.6s ease;
}

@keyframes greenbottomBubbles {
    0% {
        background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
            70% -10%, 70% 0%;
    }

    50% {
        background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
            105% 0%;
    }

    100% {
        background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
            110% 10%;
        background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
}
</style>