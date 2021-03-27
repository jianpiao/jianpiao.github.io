# webapck配置

webpack配置记录

```javascript
// webpack使用node语法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let webpack = require('webpack')
// 模块happypack可以使用多线程来打包

module.exports = {
  devServer: {  // 开发服务器的配置
    hot: true, // 启用热更新，属于实时刷新，代码块更新，不会重新打包，和watch有些差别
    port: 3001,
    progress: true,
    contentBase: './dist',
    proxy: {
      '/get': 'http://localhost:3000' // 配置代理
    }
  },
  mode: 'development', // 默认三种，1.node  2.production生产环境 3.development开发环境
  entry: './src/index.js', // 单个入口
  // entry: {  // 也可以设置多个入口
  //   index:'./src/index.js',
  //   other:'./src/other.js'
  // }, 
  output: {
    filename: '[name].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), // 路径必须是一个绝对路径
  },
  // watch: true, //  修改代码即可刷新，重新打包实现更新
  // watchOptions: {
  //   aggregateTimeout: 400, // 防抖
  //   poll: 1000  // Check for changes every second
  // },
  // noParse: /jquery/, // 控制哪些文件可以不打包--- 不去解析jquery的包
  resolve: {  // 解析第三方包
    // modules: [path.resolve('node_modules')]
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: 'source-map', // 源码映射，可以定位报错的开发环境下的文件具体的位置
  // optimization: {  // commonChunkPlugins
  //   splitChunks: {  // 分割代码块
  //     cacheGroups: {  // 缓存组
  //       common: {  // 公共的模块
  //         priority: 1, // 一般是从上往下执行，可以设置优先级
  //         chunks: 'initial',
  //         minSize: 0,
  //         minChunks: 2  // 2个文件
  //       },
  //     }
  //   }
  // },
  plugins: [  // 插件
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 去除双引号
        collapseWhitespace: true,  // 打包之后变成一行
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.DefinePlugin({  // 全局环境变量
      DEV: "'dev'"
    })
  ],
  module: { // 模块
    rules: [
      // 图片处理
      {
        test: /\.(png|jpg|gif)$/, use: "file-loader"
      },
      // es6转成es5
      {
        test: /\.(ts|js)x?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              "@babel/preset-react",  // 解析react虚拟dom最终重排reflow和重绘Repaint成实体dom节点树
              "@babel/preset-typescript"  // 使用typescript
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ]
          }
        }]
      },
      // loader的顺序是从右向左的，多个loader用[]
      {
        test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', {
          loader: 'less-loader',
          options: {
            sourceMap: true, // 源码映射
          }
        }]
      },
      {
        test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      // 支持两种形式
      // { test: /\.css$/, use: 'css-loader' },  // css结尾的，使用css-loader,主要用来解析@import这种语法
      // { test: /\.css$/, use: 'style-loader' }, // 把style插入到head中
    ]
  }
}
```

package.json文件结构

```json
{
  "name": "node",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server"
  },
  "license": "MIT",
  "dependencies": {
    "@babel/preset-react": "^7.10.4",
    "file-loader": "^6.0.0",
    "glob": "^7.1.6",
    "mobx": "^6.0.1",
    "purifycss-webpack": "^0.7.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {
    "@babel/core": "^7.11.1",
    "@babel/plugin-proposal-decorators": "^7.10.5",
    "@babel/preset-env": "^7.11.0",
    "@babel/preset-typescript": "^7.10.4",
    "autoprefixer": "^9.8.6",
    "babel-loader": "^8.1.0",
    "css-loader": "^4.2.1",
    "html-webpack-plugin": "^4.3.0",
    "less": "^3.12.2",
    "less-loader": "^6.2.0",
    "mini-css-extract-plugin": "^0.10.0",
    "node-sass": "^4.14.1",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^9.0.3",
    "style-loader": "^1.2.1",
    "webpack-dev-server": "^3.11.0"
  }
}

```





