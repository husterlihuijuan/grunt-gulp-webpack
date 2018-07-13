const path = require('path');//path是内置的模块，用来设置路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成html文件的插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清除之前打包的文件

module.exports = {
    entry: './src/js/entry.js', // 入口文件
    output: { // 输出配置
        filename: 'bundle.js', // 输出文件名
        path: path.resolve(__dirname, 'dist/js')  //输出文件路径配置  __dirname代表根目录
    },//出口
    module: {
        rules: [ //样式 loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            { //图片 loader
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },//loader
    devServer: {//热部署
        contentBase: 'dist/js/' //若为空 webpack-dev-server默认服务于根目录下的index.html
    },//热加载
    plugins: [ //插件列表
        new HtmlWebpackPlugin({template: './index.html'}),
        new CleanWebpackPlugin(['dist']),
    ]
};