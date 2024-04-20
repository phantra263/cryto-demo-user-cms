<template>
    <div class="container">
        <div class="wrap-content">
            <div class="content-left">
                <h2>List post</h2>
                <div class="list-post">
                    <RouterLink to="/list/1/abc" class="card-post" v-for="(item, index) in 20" :key="index">
                        <mark>#tag1</mark>
                        <img src="https://picsum.photos/200/300" alt="">
                        <div class="description">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui unde soluta quasi minima ex
                                hic
                                ab placeat maxime, eos non beatae ducimus autem sequi cum, fugit tempora ipsum eveniet
                                impedit?</p>
                        </div>
                    </RouterLink>
                </div>
                <button class="btn-load-more">Load more</button>
            </div>

            <div class="content-right">
                <div class="wrap-content-right">
                    <h2>List favorite</h2>
                    <div class="list-favorite">
                        <RouterLink to="/" class="card-post" v-for="(item, index) in 5" :key="index">
                            <mark>#tag1</mark>
                            <img src="https://picsum.photos/200/300" alt="">
                            <div class="description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui unde soluta quasi minima
                                    ex
                                    hic
                                    ab placeat maxime, eos non beatae ducimus autem sequi cum, fugit tempora ipsum
                                    eveniet
                                    impedit?</p>
                            </div>
                        </RouterLink>
                    </div>
                    <div class="banner-advertising">
                        <img src="https://picsum.photos/200/300" alt="">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.wrap-content-right {
    position: sticky;
    top: 85px;
}

.wrap-content {
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
        align-items: baseline;
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