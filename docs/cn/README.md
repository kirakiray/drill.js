# drill.js 使用文档

drill.js 是一个加强版的web加载工具，它的存在目的是为了让web前端开发避开[nodejs](https://nodejs.org/)的束缚，它提供了丰富的扩展功能，提供了 **声明式加载**的功能；

## 如何使用？

在 html 文件中直接使用 `script` 标签引用 drill.js 文件，就可以初始化环境；

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js"></script>
```

建议在 html 文件 head 内进行初始化，如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>page title</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js"></script>  // ⬅️ 
    ...
</head>
<body>
   ...
```

## 在 es module 环境下使用加载器

提供在JS环境下的加载器，在 esmodule 环境下使用，通过 `lm` 方法初始化，下面为加载 `test-module.mjs` 的案例；

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
    <script src="https://cdn.jsdelivr.net/npm/drill.js"></script>
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
    <script src="https://cdn.jsdelivr.net/npm/drill.js"></script>
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

## 扩展机制



## 声明式加载文件

通过 直接使用 `load-module` 或 `l-m` 标签加载自定义文件；

```html
<load-module src="path/of/the/module.mjs"></load-module>
<!-- or -->
<l-m src="path/of/the/module.mjs"></l-m>
```

## 插件机制


## 官方插件