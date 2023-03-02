# new-house

新房助手，作用是监听 [合肥摇号公示列表](http://60.173.254.126:8888/) 变动，发送到指定邮箱

## 状态

完成二期开发

## 支持功能

- 定时爬取列表
- 支持价格区间筛选
- 支持 web 界面订阅编辑

## 使用方式

```sh
git clone git@github.com:bosens-China/new-house.git
pnpm i
# 全局替换 boses 前缀，替换成你的docker 账号名称
# build backstageApi、backstageWeb、reptiles
# 更改 .env 文件下  EMAIL_ACCOUNT、EMAIL_AUTHORIZATION_CODE
```

## 环境变量说明

参考 [environment.d](./environment.d.ts) 文件

## 协议

[MIT License](./License)
