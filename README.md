# drill.js

## Use of documentation

* [简体中文](./docs/cn/README.md)
* [繁体中文](./docs/cn-tr/README.md)
* [Deutsch](./docs/ger/README.md)
* [日本語](./docs/jp/README.md)

## Introduction

`drill.js` is an enhanced web loading tool designed to free front-end developers from relying on Node.js. It provides rich extension features and supports declarative module loading.

Compared to traditional front-end development approaches, `drill.js` offers a more flexible way to load and handle modules, making front-end development more convenient and efficient.
## Official Extensions 
- [drill-less](https://github.com/kirakiray/drill.js/tree/main/libs/less) : Enables direct support for `.less` files in browsers.

## Installation

You can install `drill.js` using one of the following methods: 
- CDN: Include the following script tag in the `<head>` section of your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
```

- Package Manager: Use npm or yarn, or any other package management tool, to install:

```shell
npm install drill.js
```

## Initialization

Before using `drill.js`, you need to include the `drill.js` script in your HTML file to initialize the environment. It is recommended to place the initialization script in the `<head>` section of the HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <!-- Other contents of the head section -->
</head>
<body>
   <!-- Page content -->
</body>
</html>
```

## Module Loading

In an ES module environment, you can use the `lm` method to load modules. Here is an example of loading the `test-module.mjs` module:

[Click here to view the code](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-module/index.html) 

[Click here to see the live demo](https://kirakiray.github.io/drill.js/examples/load-module/) 

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

You can use the `load` method to load modules using the same syntax as asynchronous `import`. The loaded module can be accessed using the `test` variable to access the exported content of the module.
## Declarative Loading

You can use the `<load-module>` or `<l-m>` tags for declarative module loading, similar to using the `<script>` tag to load modules.

```html
<load-module src="path/to/the/module.mjs"></load-module>
<!-- or -->
<l-m src="path/to/the/module.mjs"></l-m>
```



This approach has the same effect as the traditional `<script>` tag, making it easy to declare module loading.

## Extending File Type Support

You can extend the support for specific file types in `drill.js` using the `lm.use` method. Here is an example of extending support for `.json` files:

```javascript

use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((e) => e.json());

  next();
});
```

Using a middleware mechanism similar to Koa, you can set `ctx.result` to return the corresponding content. You can use `lm.use` to extend support for more file types.

Check out the [example code](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-more-type/index.html)  for officially supported types, and see the [live demo](https://kirakiray.github.io/drill.js/examples/load-more-type/)  as well.

## Module Preprocessing

You can use the `lm.use` method to preprocess module data. Here is an example of registering data for preprocessing components:

[Click here to see the live demo](https://kirakiray.github.io/drill.js/examples/lm-use/) 

[Click here to view the code](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html) 

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

In preprocessing, you can perform corresponding operations based on the module's type and content. In the above example, the component registration data is processed into a custom element.

The above content covers some of the documentation for `drill.js`. Continue writing the remaining content, including examples, usage, frequently asked questions, API references, and so on.

For details on developing plugins, [please click here to read](./docs/en/plug-ins.md) .
