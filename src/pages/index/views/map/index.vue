<template>
    <div class="container">
        <map-main></map-main>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MapMain from './MapMain.vue';
@Component({
    components: {
        MapMain,
    },
})
export default class index extends Vue {}
</script>
<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    display: flex;
    border: 1px solid @bg-theme;
}
</style>
