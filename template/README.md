# 安装

```bash
yarn
```

# 运行

## 命令行参数

以`--`开头，例如`--env=test`
|环境变量|--env（区分环境，可任意值，需要匹配 .env.[name] 文件，默认:dev） |--see（分析生成包情况，只在 production 下生效，默认: false）| --log（移除日志断点，只在 production 下生效 ），默认: false
|-|-|-|-|
|开发环境 | dev| false|false|
|测试环境 | test|false |false|
|生产环境 | pro|false |false|

```bash
# 开发 development
yarn start
# 测试环境
yarn start --env=test

# 打包 production
yarn build
# 查看生成包大小情况
yarn build --see

# 保留日志及断点
yarn build --log
```
