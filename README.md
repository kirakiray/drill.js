# drill.js

## Use of documentation

* [中文文档](./docs/cn/README.md)

## Introduction

`drill.js` is an enhanced web loading tool designed to free frontend development from the dependency on Node.js. It provides rich extension capabilities and supports declarative module loading.

Compared to traditional frontend development approaches, `drill.js` offers a more flexible way of loading and handling modules, making frontend development more convenient and efficient.
## Installation

You can install `drill.js` using one of the following methods: 
- Via CDN:
Include the following script tag in the `<head>` section of your HTML file:

```html

<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
```


- Via package manager:
Install using npm or yarn, or any other package management tool:

```shell

npm install drill.js
```


## Initialization

Before using `drill.js`, you need to include the `drill.js` script in your HTML file to initialize the environment. It is recommended to place the initialization script in the `<head>` section of your HTML file.

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <!-- Other content in the head section -->
</head>
<body>
   <!-- Page content -->
</body>
</html>
```


## Module Loading

In an ES module environment, you can use the `lm` method to load modules. Here's an example of loading the `test-module.mjs` module:

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



You can use the `load` method to load modules using the same asynchronous `import` syntax. The loaded module can be accessed through the `test` variable to access its exported content.
## Declarative Loading

You can use the `<load-module>` or `<l-m>` tags for declarative module loading, similar to loading modules with the `<script>` tag.

```html

<load-module src="path/to/the/module.mjs"></load-module>
<!-- or -->
<l-m src="path/to/the/module.mjs"></l-m>
```



This approach has the same effect as using the traditional `<script>` tag to load modules, providing a convenient way to declare module loading.
## Extended File Type Support

You can extend the support for specific file types in `drill.js` using the `lm.use` method. Here's an example of extending support for `.json` files:

```javascript

use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((response) => response.json());

  next();
});
```



Using middleware similar to Koa, you can set the `ctx.result` to return the corresponding content. You can use `lm.use` to extend support for more file types.
## Module Preprocessing

You can preprocess module data using the `lm.use` method. Here's an example of registering a preprocessing component:

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

In the preprocessing step, you can perform operations based on the module's type and content. In the example above, the component registration data is processed into a custom element.

The above content covers some of the documentation for `drill.js`. Continue writing the remaining content, including examples, usage, FAQs, API references, and more.
