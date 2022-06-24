// vue.config.js
const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const location = 'file:///Users/maqianbo/project_personal/vue-template/vue-template/dist/';
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? location : '/',
    // 公共路径
    indexPath: 'index.html',
    // 相对于打包路径index.html的路径
    outputDir: process.env.outputDir || 'dist',
    // 'dist', 生产环境构建文件的目录
    assetsDir: 'static',
    // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    runtimeCompiler: true,
    // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD,
    // 生产环境的 source map
    // parallel: require('os').cpus().length > 1,
    parallel: false,
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    chainWebpack: config => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin('html').tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = 'none';
            return args;
        });
        // 压缩图片
        // 需要 npm i -D image-webpack-loader
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
                    happyPackMode: true,
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [
                            tsImportPluginFactory({
                                libraryName: 'elementUI',
                                libraryDirectory: 'es',
                                // 这句必须加上，不然修改主题没有效果
                                style: name => `${name}/style/less`,
                            }),
                        ],
                    }),
                    compilerOptions: {
                        module: 'es2015',
                    },
                });
                return options;
            });
        // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
        if (IS_PROD) {
            config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: 'static',
                },
            ]);
        }
    },
    configureWebpack: config => {
        // 开启 gzip 压缩
        // 需要 npm i -D compression-webpack-plugin
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            );
        }
        config.plugins = [...config.plugins, ...plugins];
    },
    css: {
        extract: IS_PROD,
        requireModuleExtension: true,
    },
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true,
        },
        // 端口号
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
    },
};
