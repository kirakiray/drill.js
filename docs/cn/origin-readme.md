# drill.js 使用文档

drill.js 是一个加强版的web加载工具，它的存在目的是为了让web前端开发避开[nodejs](https://nodejs.org/)的束缚，它提供了丰富的扩展功能，提供了 **声明式加载**的功能；

## 如何使用？

在 html 文件中直接使用 `script` 标签引用 drill.js 文件，就可以初始化环境；

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
```

建议在 html 文件 head 内进行初始化，如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>page title</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>  // ⬅️ 
    ...
</head>
<body>
   ...
```

## 在 es module 环境下使用加载器

提供在JS环境下的加载器，在 es module 环境下使用，通过 `lm` 方法初始化，下面为加载 `test-module.mjs` 的案例；

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
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>load module</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
  </head>
  <body>
    <script type="module">
      const load = lm(import.meta);

      (async () => {
          // const test = await import("./target/test-module.mjs");
          const test = await load("./target/test-module.mjs"); // Yes, it's the same as asynchronous import

        document.write(test.getDesc());
        console.log(test.getDesc()); // => I am target/test-module.mjs
      })();
    </script>
  </body>
</html>
```

`load` 方法和 `import` 保持一致，但是 `load` 提供了更丰富的加载内容，默认情况下，已经支持 `.json` 和 `.wasm` 文件；

```json
// target/ccc.json
{
    "name": "ccc json"
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>load more type</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
  </head>
  <body>
    <script type="module">
      const load = lm(import.meta);
      
      (async () => {
        const json = await load("./target/ccc.json");

        console.log(json.name); // => ccc json
      })();
    </script>
  </body>
</html>
```

如何支持更多的文件类型？请继续看；

## 扩展文件类型支持

你可以通过[查看源代码](https://github.com/kirakiray/drill.js/blob/main/src/use.mjs)，知道如何支持 `.json` 文件；

```javascript
use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((e) => e.json());

  next();
});
```

这是一个类似 koa 的中间件机制，通过设置 `ctx.result` 为返回的内容；

use 第一个参数为扩展文件的类型，第二个是中间件函数；

`use` 方法已经暴露在 `lm` 对象上，你可以通过 `lm.use` 扩展支持的更多类型；

记得要执行 `next` 函数，不然下一个中间件将不会运行

```javascript
lm.use('vue',async(ctx,next)=>{
  ... // Support for vue file logic

  next();
});
```

## 声明式加载文件

通过 直接标签 `load-module` 或 `l-m` 加载模块；

```html
<load-module src="path/of/the/module.mjs"></load-module>
<!-- or -->
<l-m src="path/of/the/module.mjs"></l-m>
<!-- Yes, the same method and effect as the script tag -->
<!-- <script type="module" src="path/of/the/module.mjs"></script> -->
```

## 模块预处理

通过扩展方法 `use` 我们可以对模块数据进行预处理，下面举个预处理组件注册数据的案例；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lm use</title>
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
  const { content, tag, type } = ctx.result;

  if (type === "component") {
    class MyElement extends HTMLElement {
      constructor() {
        super();
        this.innerHTML = content;
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
```

查看效果后，可以看到 `test-comp` 元素会被注册，并直接填充了 content 的内容；

后面注册组件就不用写一大堆东西，只需要封装 es module 数据，使用时用声明式加载即可；

## 官方扩展

[drill-less](https://github.com/kirakiray/drill.js/tree/main/libs/less) : 让浏览器直接支持 `.less` 文件；

