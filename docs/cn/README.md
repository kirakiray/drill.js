# drill.js

## 简介

`drill.js` 是一个加强版的 web 加载工具，旨在让前端开发摆脱对 Node.js 的依赖。它提供了丰富的扩展功能，并支持声明式加载模块。

与传统的前端开发方式相比，`drill.js` 提供了更灵活的加载和处理模块的方式，使前端开发更加便捷和高效。

## 官方扩展

- [drill-less](https://github.com/kirakiray/drill.js/tree/main/libs/less) : 让浏览器直接支持 `.less` 文件；

## 安装

可以通过以下方式之一来安装 `drill.js`： 
- 通过 CDN 引入：
在 HTML 文件的 `<head>` 部分引入以下脚本标签：

```html

<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
``` 
- 通过包管理器安装：
使用 npm 或 yarn 等包管理工具进行安装：

```shell

npm install drill.js
```
## 初始化

在使用 `drill.js` 之前，需要在 HTML 文件中引入 `drill.js` 脚本以初始化环境。建议将初始化脚本放在 HTML 文件的 `<head>` 部分。

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <!-- 其他 head 部分的内容 -->
</head>
<body>
   <!-- 页面内容 -->
</body>
</html>
```

## 加载模块

在 ES 模块环境下，可以使用 `lm` 方法进行模块加载。以下是加载 `test-module.mjs` 模块的示例：

[点击我查看代码](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-module/index.html)

[点击我查看效果](https://kirakiray.github.io/drill.js/examples/load-module/)

```javascript
// target/test-module.mjs
export const getDesc = () => {
  return "I am target/test-module.mjs";
};
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Load Module</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
  </head>
  <body>
    <script type="module">
      const load = lm(import.meta);

      (async () => {
          const test = await load("./target/test-module.mjs");

        document.write(test.getDesc());
        console.log(test.getDesc()); // => I am target/test-module.mjs
      })();
    </script>
  </body>
</html>
```

通过 `load` 方法加载模块，可以使用异步 `import` 相同的语法。加载的模块可以通过 `test` 变量访问模块的导出内容。

## 声明式加载

通过 `<load-module>` 或 `<l-m>` 标签可以进行声明式加载模块，类似于使用 `<script>` 标签加载模块。

```html
<load-module src="path/to/the/module.mjs"></load-module>
<!-- 或 -->
<l-m src="path/to/the/module.mjs"></l-m>
```

这种方式与传统的 `<script>` 标签具有相同的效果，可以方便地声明加载模块。

## 扩展文件类型支持

可以通过 `lm.use` 方法扩展 `drill.js` 对特定文件类型的支持。以下是扩展支持 `.json` 文件的示例：

```javascript
use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((e) => e.json());

  next();
});
```

使用类似 Koa 的中间件机制，通过设置 `ctx.result` 返回相应的内容。可以使用 `lm.use` 扩展更多文件类型的支持。

官方[已支持的类型示例代码](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-more-type/index.html)；查看[在线效果](https://kirakiray.github.io/drill.js/examples/load-more-type/)；

## 模块预处理

可以使用 `lm.use` 方法对模块数据进行预处理。以下是一个预处理组件注册数据的示例：

[点击我查看效果](https://kirakiray.github.io/drill.js/examples/lm-use/)

[点击我查看代码](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html)；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Module Preprocessing</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <script src="./register-drill.js"></script>
    <l-m src="./test-comp.mjs"></l-m>
  </head>
  <body>
    <test-comp></test-comp>
  </body>
</html>
```

```javascript
// register-drill.js
lm.use(["js", "mjs"], async (ctx, next) => {
  const { content, tag, type, style } = ctx.result;

  if (type === "component") {
    class MyElement extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = content;
        style && Object.assign(this.style, style);
      }
    }

    customElements.define(tag, MyElement);
  }

  next();
});

```

```javascript
// test-comp.mjs
export const type = "component";

export const tag = "test-comp";

export const content = "Hello, World! This is my custom element.";

export const style = {
  color: "red",
  padding: "10px",
  margin: "10px",
  backgroundColor: "#eee",
};
```

在预处理中，可以根据模块的类型和内容进行相应的操作。上述示例中，将组件注册数据处理为自定义元素。

以上是 `drill.js` 的部分使用文档内容。继续编写剩下的内容，包括示例和用法，常见问题解答，API 参考等。

关于开发插件的细节，[请点击查阅](./plug-ins.md)。