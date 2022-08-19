<template>
    <section class="nav" :class="{ isCollapse: isCollapse }">
        <el-button @click="isCollapse = !isCollapse" size="small">
            {{ isCollapse ? '展开' : '收起' }}
        </el-button>
        <el-menu router :collapse="isCollapse">
            <menu-list :menus="routes"></menu-list>
        </el-menu>
    </section>
</template>

<script lang="ts">
/**
 * @description 左侧导航栏
 * @fileName index.vue
 * @author maqianbo
 * @date 2022/08/01 19:42:21
 * @version
 */

import { Component, Vue } from 'vue-property-decorator';
import { routes } from '../../router/index';
import { RouteConfig } from 'vue-router';
import MenuList from './MenuList.vue';
@Component({
    components: {
        MenuList,
    },
})
export default class index extends Vue {
    private routes: RouteConfig[] = [];
    private isCollapse = false;
    private created() {
        this.routes = routes;
    }
}
</script>

<style lang="less" scoped>
//自定义样式
.nav {
    height: 100%;
    width: 200px;
    padding-right: 3px;
    background: @bg-theme;
    transition: width 1s ease-in;
    &.isCollapse {
        width: 63px;
    }
    ::v-deep {
        .el-menu {
            border-right: none;
        }
    }
}
</style>
