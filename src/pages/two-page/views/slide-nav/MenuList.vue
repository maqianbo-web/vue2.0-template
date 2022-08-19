<template>
    <div>
        <template v-for="menu in menus">
            <!-- 类型为菜单时，使用 el-submenu -->
            <el-submenu
                v-if="menu.children && menu.children.length"
                :index="menu.path"
                :key="menu.path"
            >
                <template slot="title">
                    <i :class="menu.meta.icon"></i>
                    <span slot="title">{{ menu.meta.name }}</span>
                </template>
                <!-- 只有菜单有下级，所以放在这个位置 -->
                <menu-list :menus="menu.children"></menu-list>
            </el-submenu>
            <!-- 类型为功能时，使用 el-menu-item -->
            <el-menu-item v-else :index="menu.path" :key="menu.path">
                <i :class="menu.meta.icon"></i>
                <span slot="title">{{ menu.meta.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script lang="ts">
/**
 * @description 无限递归菜单
 * @fileName MenuList.vue
 * @author maqianbo
 * @date 2022/08/14 21:06:07
 * @version
 */

import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class MenuList<T> extends Vue {
    @Prop({ default: () => [] }) menus!: Array<T>;
}
</script>
