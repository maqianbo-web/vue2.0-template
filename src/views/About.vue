<template>
    <section>{{ msg }}</section>
</template>

<script lang="ts">
/**
 * @description
 * @fileName About.vue
 * @author maqianbo
 * @date 2022/08/14 21:12:57
 * @version
 */

import { Component, Vue } from 'vue-property-decorator';
@Component({})
export default class About extends Vue {
    // @State('addButton') private addButton: boolean
    // @Prop({default: 10010}) moduleId!: number
    // @Watch('moduleId',{immediate:true})
    // @Emit() private parentHandler(value: boolean) { return value}
    private msg = 'hello world';
}
</script>

<style lang="less" scoped>
//自定义样式
</style>
