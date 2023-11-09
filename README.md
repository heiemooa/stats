# stats

一个基于 UptimeRobot API 的在线状态面板

![Emooa-站点监测.png](https://s1.ax1x.com/2023/07/20/pCHnLLt.png)

## 特色

- 站点状态总览
- 流畅的动画
- 数据获取失败提醒
- 移动端适配

## 事先准备

- 您需要先到 [UptimeRobot](https://uptimerobot.com/dashboard) 添加站点监控，并在 `My Settings` 页面获取 类型为 `Read-Only API Key` 的 `API Key`

## 如何使用

- `star` 并 `fork` 😘
- 按照下方部署操作来安装依赖
- 在 `.env` 文件中进行配置修改
- 将打包后的文件上传至网站空间或者直接使用 `Vercel` 或者 `Cloudflare` 直接部署该项目

## 部署

### 安装依赖

```bash

# 安装依赖
yarn
```

### 开发

```bash
yarn dev
```

### 打包

```bash
yarn build
```

## 鸣谢

- [site-status](https://github.com/imsyy/site-status) 基于此项目 fork
- [uptime-status](https://github.com/yb/uptime-status) 基于此项目进行修改
