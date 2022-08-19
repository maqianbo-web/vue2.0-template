<template>
    <div id="app">
        <header>vue2.0-template</header>
        <section class="content">
            <nav>
                <slide-nav />
            </nav>
            <article>
                <router-view />
            </article>
        </section>
    </div>
</template>

<script lang="ts">
/**
 * @description App首页
 * @fileName App.vue
 * @author maqianbo
 * @date 2022/08/01 19:42:21
 * @version
 */

import { Component, Vue } from 'vue-property-decorator';
import SlideNav from './views/slide-nav/index.vue';
@Component({
    components: {
        SlideNav,
    },
})
export default class index extends Vue {}
</script>

<style lang="less">
#app {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
header {
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
    background: @bg-theme;
    border-bottom: 1px solid #ededed;
}
.content {
    flex: 1;
    display: flex;
    article {
        flex: 1;
        overflow: hidden;
        padding: 10px;
    }
}
</style>
