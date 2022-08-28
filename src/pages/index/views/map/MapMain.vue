<template>
    <div id="container"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AMapLoader from '@amap/amap-jsapi-loader';

window._AMapSecurityConfig = {
    securityJsCode: '3130a656eb28f4bad7905351db1ece03',
};

@Component({
    components: {},
})
export default class MapMain extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private AMap: any = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private map: any = null;
    private mounted() {
        this.init();
    }
    // 初始化地图
    private async init() {
        AMapLoader.load({
            key: '24fe1348acbd8125428fd388ebf63a53', // 申请好的Web端开发者Key，首次调用 load 时必填
            version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        })
            .then(AMap => {
                this.$nextTick(() => {
                    this.AMap = AMap;
                    this.map = new this.AMap.Map('container', {
                        zoom: 11, //级别
                        zooms: [2, 20],
                        center: [116.397428, 39.90923], //中心点坐标
                        viewMode: '3D', //使用3D视图
                        // pitch: 5, // 地图俯仰角度，有效范围 0 度- 83 度
                    });
                    this.setMouseCursor();
                    this.setMouseClick();
                    this.setCircle();
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    // 设置鼠标点击监听事件
    private setMouseClick() {
        this.map.on('click', (e: { lnglat: { getLng: () => string; getLat: () => string } }) => {
            const h = this.$createElement;
            this.$notify({
                title: '点击地图图层，获取经纬度',
                message: h(
                    'i',
                    { style: 'color: teal' },
                    `经度${e.lnglat.getLng()},纬度${e.lnglat.getLat()}`,
                ),
            });
        });
    }

    // 设置鼠标样式
    private setMouseCursor() {
        this.map.setDefaultCursor('pointer');
    }
    // 设置原型矢量图形
    private setCircle() {
        const circle = new this.AMap.Circle({
            center: new this.AMap.LngLat('116.397428', '39.90923'), // 圆心位置
            radius: 1000, //半径
            strokeColor: 'yellow', //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 3, //线粗细度
            fillColor: 'blue', //填充颜色
            fillOpacity: 0.35, //填充透明度
        });
        this.map.add(circle);
    }

    private beforeDestroy() {
        this.map && this.map.destroy();
    }
}
</script>
<style scoped lang="less">
#container {
    width: 100%;
    height: 100%;
}
</style>
