# new-house

新房助手，作用是监听 [合肥摇号公示列表](https://www.hfzfzlw.com/spf/Scheme/) 变动，发送到指定邮箱

## 支持功能

- 定时爬取列表
- 支持价格区间筛选
- 支持 web 界面订阅编辑

## 使用方式

### 本地运行

```sh
git clone git@github.com:bosens-China/new-house.git
pnpm i
# 全局替换 boses 前缀，替换成你的docker 账号名称
# build backstageApi、backstageWeb、reptiles
# 更改 .env 文件下  EMAIL_ACCOUNT、EMAIL_AUTHORIZATION_CODE
```

### Docker

参考 [test.yml](./test.yml) 文件

## 环境变量说明

参考 [environment.d](./environment.d.ts) 文件

## 后续计划

- 完善代理池调度

## 协议

[MIT License](./License)
