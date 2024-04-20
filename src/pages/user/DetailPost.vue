import { Tag } from 'ant-design-vue';
<template>
    <div class="container">
        <div class="wrap-detail">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore modi quo aliquam, alias eveniet dolorem
                amet, deleniti.</h1>
            <a-tag color="blue">#blue</a-tag>

            <div class="media">
                <iframe src="https://www.youtube.com/embed/9Okd87cZ0mw?si=BzV6DjQl2lxjdWE6" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="content-detail">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum a, dignissimos porro nihil quia
                sint, accusantium est vel animi magni facilis consectetur assumenda reiciendis hic ad nisi perspiciatis
                alias?
            </div>
        </div>

        <div class="wrap-list-similar">
            <h2>Bài viết liên quan</h2>
            <swiper :modules="modules" :slides-per-view="2" :space-between="5" navigation
                :pagination="{ clickable: true }" :breakpoints="{
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                }
            }">
                <swiper-slide v-for="(item, index) in 5" :key="index">
                    <RouterLink to="/list/1/abc" class="card-post">
                        <mark>#tag1</mark>
                        <img src="https://picsum.photos/200/300" alt="">
                        <div class="description">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui unde soluta quasi minima ex
                                hic
                                ab placeat maxime, eos non beatae ducimus autem sequi cum, fugit tempora ipsum eveniet
                                impedit?</p>
                        </div>
                    </RouterLink>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination, A11y];
</script>
<style scoped lang="scss">
.wrap-detail {
    width: 100%;
    margin: auto;
    padding: 30px 0;

    h1 {
        font-size: 20px;
    }

    .media {
        iframe {
            width: 100%;
            height: 400px;
            margin: 20px auto;
        }
    }
}

.wrap-list-similar {
    padding-bottom: 30px;
}

:deep(.swiper) {
    padding-bottom: 25px;

    .swiper-pagination {
        bottom: 6px;
    }

    .swiper-pagination-bullet {
        background: #fff;
    }
}
</style>