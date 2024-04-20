<template>
    <header>
        <div class="container">
            <div class="wrap-header">
                <router-link to="/list"><img src="../assets/banner-bitcoin.png" class="logo" alt="logo"></router-link>
                <nav class="menu-header">
                    <a href="/html/">type1</a>|
                    <a href="/css/">type2</a>|
                    <a href="/js/">type3</a>|
                    <a href="/python/">type4</a>
                </nav>
            </div>
        </div>
    </header>
</template>
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

        .menu-header {
            a {
                padding: 10px;
                color: #EAECEF;

                &:hover,
                &.active {
                    color: #F0B90B;
                }
            }
        }
    }
}
</style>