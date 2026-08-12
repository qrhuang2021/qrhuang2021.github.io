个人网页的部署，本质上是把网页文件放到一台能被 Internet 访问的服务器上。本文先理解网页访问原理，再分别说明纯静态网页和 React 网页如何通过 GitHub 完成部署。

## 1. 网页访问原理

网页访问是 browser（客户端）向 web server（服务器）请求文件的过程。URL `https://example.com/about` 指定了通信协议 `https`、域名 `example.com` 和资源路径 `/about`。当在浏览器上输入网址 `https://example.com/about` 并回车以后发生了下面这些事情:

1. **定位并连接服务器**：浏览器通过 DNS 将域名 `example.com` 查询为服务器的 IP address，并与服务器建立加密的 HTTPS connection；
2. **请求资源**：浏览器向服务器发送 HTTP request，说明自己想获取路径 `/about` 对应的资源；
3. **接收并渲染页面**：服务器返回 HTTP response；浏览器解析其中的 HTML，继续请求 CSS、JavaScript 和图片，最终渲染出页面。

因此，部署静态网站需要完成三件事：

1. **准备内容**：准备浏览器可以读取的文件资源，并以 `index.html` 作为主页入口；
2. **提供托管**：把这些文件放到一台可以从 Internet 访问的 web server 上；
3. **建立访问入口**：提供可解析的 URL，并让 request 能到达服务器、找到正确文件。

## 2. 纯静态网页部署到 GitHub

纯静态网页由 `index.html`、CSS、JavaScript 和图片组成，这些文件无需额外转换就能被浏览器读取。

### 开发者需要做什么

1. 创建名为 `<username>.github.io` 的 Repo；
2. 将网页文件放在 Repo 根目录并 push 到 `main`；
3. 在 `Settings → Pages` 中选择 `Deploy from a branch`，指定 `main` 和 `/ (root)`。Pages workflow 完成后，网站便可通过 `https://<username>.github.io/` 访问。

### 为什么这三件事成立了

1. **准备内容**：Repo 的 publishing source 中已有浏览器可读取的文件，根目录的 `index.html` 是主页入口；
2. **提供托管**：push 会触发 Pages 的默认 build/deploy workflow，把文件发布到 GitHub 管理的 static web server；
3. **建立访问入口**：特殊 Repo 名将仓库与同名 URL 关联；GitHub 负责 `github.io` 的 DNS、HTTPS，并根据 URL path 返回对应文件。

Repo 负责保存文件，但它本身不是 server；GitHub Pages 补上了托管和访问机制。浏览器需要的内容、server 和 URL 因而全部就绪，第一节中的访问过程便可以发生。

## 3. React 网页部署到 GitHub

React/Vite 项目中的 JSX、components 和 npm dependencies 是开发源码，并非准备直接发布的文件；Vite 需要先将它们转换、打包和压缩：

```bash
npm run build
```

构建结果位于 `dist/`。其中仍然只是 HTML、CSS、JavaScript 和图片，所以 React 网站构建完成后，本质上也是可以由 GitHub Pages 托管的静态网站。

### 开发者需要做什么

1. 确认本地执行 `npm run build` 能生成可正常预览的 `dist/`；
2. 在 `.github/workflows/deploy.yml` 中配置 workflow：checkout 源码、安装 Node.js 和 dependencies、执行 build、上传 `dist/` 并部署到 Pages；
3. 在 `Settings → Pages` 中选择 `GitHub Actions`，随后将代码 push 到 `main`。

```text
push main → GitHub Actions → build dist/ → GitHub Pages
```

### 为什么这三件事成立了

1. **准备内容**：Actions 在临时 runner 中执行 Vite build，将开发源码转换为浏览器可读取的 `dist/`；
2. **提供托管**：workflow 将 `dist/` 上传为 Pages artifact，再部署到 GitHub 管理的 static web server；
3. **建立访问入口**：Pages 继续提供同一套 URL、DNS 和 HTTPS；本项目使用 `HashRouter`，`#` 后的前端路由不发送给 server，刷新页面时仍由根目录的 `index.html` 接管。

因此，GitHub Actions 是自动生产 `dist/` 的流水线，GitHub Pages 是长期提供 `dist/` 的 web server；两者职责不同，但共同完成 React 网站的部署。

## 相关概念

- **URL（Uniform Resource Locator）**：网络资源的完整地址，由 protocol、domain 和 path 等部分组成，例如 `https://example.com/about`。
- **DNS（Domain Name System）**：全球分布式的域名解析系统，作用是把域名转换为定位服务器所需的 IP address。
- **IP address**：设备在网络中的地址，浏览器用它定位需要连接的服务器。
- **HTTP / HTTPS**：浏览器与服务器交换 request 和 response 的通信协议；HTTPS 在 HTTP 之上增加了加密和身份验证。
- **Web server**：接收 HTTP request，并返回 HTML、CSS、JavaScript、图片等资源的服务器。
