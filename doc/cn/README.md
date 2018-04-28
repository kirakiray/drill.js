# 使用文档

[1.基础使用](01.md)

[2.define模块详细使用](02.md)

[3.task模块详细使用](03.md)

[4.drill.js进阶](04.md)

1. 基础使用
    - 如何使用 drill.js
    - 开始使用
    - 完成后操作
    - define模块简易使用
    - task模块简易使用
2. define模块详细使用
    - 直接定义模块
    - 依赖其它模块
    - 相对路径
    - 定义id
3. task模块详细使用
    - `task模块`和`define模块`的异同
    - 模块依赖
    - 传递数据
    - task模块常用的一种应用场景
    - 相对路径
    - 定义id
    - 非主流task模块写法
4. drill.js进阶
    - 并行加载
    - pend加载中回调
    - 初始配置
        - baseUrl
        - paths
    - 初始化函数定义
    - 报错机制



上面就是 `drill.js` 的使用文档，在使用一段时间后，如果想自己开发 `drill.js` 的插件，可以参考下面的原理；

[drill.js的基本原理](11.md)

[如何开发 drill.js 的插件](12.md)

## 教程前说明

每个案例说明前，都会先描述案例的目录结构和文件内容，测试页面基本都是 `index.html`；

而 `drill.js` 都会放在案例的 `js/` 目录下；

案例支持es6的浏览器上跑，但是在es7的浏览器才好用（是为了es7设计的），所以下面案例需要浏览器支持es7(async await)；

后面会讲怎么使用Babel兼容旧的浏览器；

原生支持 `asyc await` 的浏览器有: 

* Edge (>=15) 
* Firefox (>=52)
* Chrome (>=55)
* Mac OS Safari (>=10.1)
* iOS Sfari (>= 10.3)
* Opera (>=42)
* UC等浏览器的最新版

使用前，需要学习一下[异步函数(async function)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)的知识；