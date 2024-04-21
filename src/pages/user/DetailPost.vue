<template>
    <div class="container">
        <div class="wrap-detail" v-if="!isEmptyObject(detailPost)">
            <h1>{{ detailPost.title }}</h1>
            <a-tag color="blue">#{{ detailPost.tag_name }}</a-tag>

            <div class="media" v-html="detailPost.url"></div>
            <div class="content-detail" v-html="detailPost.description"></div>
        </div>
        <a-empty v-else-if="!loading && isEmptyObject(detailPost)" style="width: 100%;" />

        <div class="wrap-list-similar" v-if="!loading">
            <h2>Bài viết liên quan</h2>
            <div class="list-similar">
                <RouterLink v-if="listPost && listPost.length" :to="{ path: `/detail/${item.id}/${item.slug}` }"
                    class="card-post" v-for=" item  in  listPost " :key="item.id">
                    <mark>#{{ item.tag_name }}</mark>
                    <figure>
                        <img :src="item.thumbnail" alt="">
                    </figure>
                    <div class="description">
                        <h3>{{ item.title }}</h3>
                        <!-- <div v-html="item.description" class="content-desc"></div> -->
                    </div>
                </RouterLink>
                <Loading v-if="loading" />
            </div>
            <button class="btn-load-more" @click="loadmore" v-if="listPost.length < total">Load more</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import HomeSrv from '../../services/USER/home.service';
import DetailSrv from '../../services/USER/detail.service'
import { useRoute } from 'vue-router';
import Loading from '../../components/Loading.vue';

const total = ref(0);
const listPost = ref([]);
const detailPost = ref({});
const loading = ref(false);
const route = useRoute();
let fetchParams = {
    page: 1,
    per_page: 15,
}

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
}

const getListPost = async () => {
    try {
        const res = await HomeSrv.getListPost(fetchParams);
        if (res.data.success) {
            listPost.value = listPost.value.concat(res.data.data);
            total.value = res.data.pagination.total;
        }
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};


const getDetailPost = async () => {
    loading.value = true;
    try {
        const res = await DetailSrv.getPostById(route.params.id);
        if (res.data.success) {
            detailPost.value = res.data.data;
        }
    } catch (error) {
        console.error('Error fetching post:', error);
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
    getListPost();
    getDetailPost();
});

watch(() => route.params.id,
    async newId => {
        detailPost.value = {};
        await getDetailPost()
    }
)
</script>
<style scoped lang="scss">
.wrap-detail {
    width: 100%;
    margin: auto;
    padding: 30px 0;
    font-size: 16px;
    line-height: 28px;

    h1 {
        font-size: 20px;
    }
}

.wrap-list-similar {
    padding-bottom: 30px;

    .list-similar {
        display: flex;
        flex-wrap: wrap;

        .card-post {
            width: calc(100% / 5 - 15px);
        }
    }
}
</style>