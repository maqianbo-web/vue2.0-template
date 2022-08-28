// vue.config.js
const path = require('path');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包分析

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';
const baseURL = 'file:///Users/maqianbo/project_personal/vue-template/vue-template/dist/'; // 应用部署的位置

// 多页面打包配置
const getPages = () => {
    return {
        index: {
            entry: 'src/pages/index/main.ts', // page 的入口
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            title: '首页',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
        second: {
            entry: 'src/pages/second/main.ts', // page 的入口
            template: 'public/index.html', // 模板来源
            filename: 'second.html',
            title: '第二页面',
            chunks: ['chunk-vendors', 'chunk-common', 'second'],
        },
    };
};

const getDevServe = () => {
    return {
        overlay: {
            warnings: false, // 让浏览器 overlay 同时显示警告和错误
            errors: true,
        },
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        proxy: {
            // 配置多个跨域
            '/api': {
                target: 'http://xxx.xxx',
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    '^/api': '/',
                },
            },
        },
    };
};
const setOptimization = config =>
    (config.optimization = {
        splitChunks: {
            cacheGroups: {
                common: {
                    //抽取所有入口页面都需要的公共chunk
                    name: 'chunk-common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: 1,
                    enforce: true,
                    minSize: 0,
                    reuseExistingChunk: true,
                },
            },
        },
    });

module.exports = {
    pages: getPages(),
    publicPath: isProduction ? baseURL : '/',
    outputDir: 'dist',
    indexPath: 'index.html',
    lintOnSave: isDevelopment,
    runtimeCompiler: isDevelopment,
    productionSourceMap: !isProduction,
    parallel: true,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, './src/style/variable.less')],
        },
    },

    css: {
        extract: isProduction,
        requireModuleExtension: true,
    },
    devServer: getDevServe(),
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true,
            })
            .end();
        config.module
            .rule('ts')
            .use('ts-loader')
            .tap(options => {
                options = merge(options, {
                    transpileOnly: true,
                    compilerOptions: {
                        module: 'es2015',
                    },
                });
                return options;
            });
        if (isProduction) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static',
                },
            ]);
        }
    },
    configureWebpack: config => {
        setOptimization(config);
    },
};
