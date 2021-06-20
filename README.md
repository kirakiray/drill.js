# drill 4

已经是2021年了，可以用新的API优化更多代码；不用兼容太旧的浏览器了；

frame等不常用功能变为插件；去除掉不常用的 `过渡中` 的状态；

文件的后缀也同样重要，不能再缺失后缀。

## 为什么使用 drill.js ？

* 不依赖webpack nodejs ，管理项目资源(js/css/...)；
* 按需加载模块，为项目提供 `过渡中` 的状态，方便做用户体验优化；


<!-- # drill 3

更改为浏览器的资源管理器，不单纯只是模块化框架；

将载入函数名改为 `load` 而不是 `require`，从此不会在 `electron` 等CMD框架内起冲突；

大幅增强扩展性，进一步精简代码，提高核心可阅读性，降低开发扩展的难度；

### 更新历史

- **3.2**
    - 没有注册fileType的文件，获取并返回utf-8数据;
- **3.1**
    - 添加 `frame` 模块，能够在浏览器上方便的使用多线程了

## 目录结构

`dist/` 合并后的源文件；

`doc/` 使用文档；

`src/` 源代码目录；

`test/` 测试案例目录；

`plugin/` 官方插件目录；

## 使用文档

[点击doc目录](doc/README.md)

## 为什么使用 drill.js ？

* 不依赖webpack nodejs ，管理项目资源(js/css/...)；
* 按需加载模块，为项目提供 `过渡中` 的状态，方便做用户体验优化；
* 能根据浏览器的支持状态，动态判断载入Babel编译的es5或原生的es7文件；

## 案例

采用 [Xhear](https://github.com/kirakiray/Xhear/) +  [drill.js](https://github.com/kirakiray/drill.js/)开发的 [PageCreator](https://kirakiray.com/pageCreator/)。 -->