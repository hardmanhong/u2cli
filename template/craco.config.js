/* craco.config.js */
/**
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const { when, whenDev, whenProd } = require('@craco/craco')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
// const CracoAntDesignPlugin = require('craco-antd')
const CracoVtkPlugin = require('craco-vtk')
const WebpackBar = require('webpackbar')
// const CircularDependencyPlugin = require('circular-dependency-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const path = require('path')

const shouldUseSourceMap = false
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl)

const args = require('minimist')(process.argv.slice(2))
const env = args.env || 'dev'
const dotenvPath = './.env.' + env
require('dotenv').config({ path: dotenvPath })
const chalk = require('chalk')
console.log(chalk.green(`环境配置：${dotenvPath}`))
const isEnvProduction = process.env.NODE_ENV === 'production'
const isLog = isEnvProduction && args.log
const isBuildAnalyzer = isEnvProduction && args.see

module.exports = {
  webpack: {
    // 别名配置
    alias: {
      '@': pathResolve('./src')
    },
    plugins: [
      // 配置环境变量
      new Dotenv({
        path: pathResolve(dotenvPath)
      }),
      // webpack构建进度条
      new WebpackBar({
        profile: true
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 查看打包的进度
      //   new SimpleProgressWebpackPlugin(),
      // 时间转换工具采取day替换moment
      new AntdDayjsWebpackPlugin(),
      ...whenDev(
        () => [
          //   新增模块循环依赖检测插件
          //   new CircularDependencyPlugin({
          //     exclude: /node_modules/,
          //     include: /src/,
          //     failOnError: true,
          //     allowAsyncCycles: false,
          //     cwd: process.cwd()
          //   }),
          // webpack-dev-server 强化插件
          new DashboardPlugin()
        ],
        []
      ),
      /**
       * 编译产物分析
       *  - https://www.npmjs.com/package/webpack-bundle-analyzer
       * 新增打包产物分析插件
       */
      ...when(
        isBuildAnalyzer,
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // html 文件方式输出编译分析
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, `analyzer/index.html`)
          })
        ],
        []
      ),
      ...whenProd(
        () => [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                // 删除日志
                drop_console: isLog,
                drop_debugger: isLog,
                pure_funcs: isLog && ['console.log']
              },
              mangle: {
                safari10: true
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true
              }
            },
            parallel: true,
            cache: true,
            sourceMap: shouldUseSourceMap
          }),
          // 打压缩包
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
          })
        ],
        []
      )
    ],
    //抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      }
    }
  },
  /**
   * 新增 craco 提供的 plugin
   */
  plugins: [
    // 热更新
    ...whenDev(
      () => [
        {
          plugin: CracoVtkPlugin()
        },
        {
          plugin: new AntdDayjsWebpackPlugin()
        }
      ],
      []
    )
    // 方案2、配置Antd主题
    // {
    //   plugin: CracoAntDesignPlugin,
    //   options: {
    //     customizeTheme: {
    //       '@primary-color': '#FF061C'
    //     }
    //   }
    // },
    // 方案3、配置Antd主题
    //   {
    //     plugin: CracoAntDesignPlugin,
    //     options: {
    //       customizeThemeLessPath: path.join(
    //         __dirname,
    //         "antd.customize.less"
    //       ),
    //     },
    //   },
  ],
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        target: process.env.API_BASE_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
