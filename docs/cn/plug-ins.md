# 开发插件的细节

当扩展 drill.js 库的功能以支持更多类型的文件时，可以遵循以下步骤： 

1. 查看源代码
   - 首先，你可以查看 drill.js 的[源代码](https://github1s.com/kirakiray/drill.js/blob/main/src/use.mjs)，了解它是如何支持已有文件类型的加载和处理的。 
   - 官方的 [use 示范代码](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html)；
   - 官方支持 `less`插件的[源代码](https://github1s.com/kirakiray/drill.js/blob/main/libs/less/src/init.js)；
2. 使用 `lm.use` 方法 
   - drill.js 提供了 `lm.use` 方法来扩展文件类型支持。 
   - `lm.use` 方法接受两个参数：`fileType` 和 `middleware` 函数。 
   - `fileType` 是要扩展的文件类型，可以是字符串或字符串数组，用于匹配文件的扩展名。 
   - `middleware` 函数是一个中间件函数，用于处理加载和处理特定文件类型的逻辑。 
3. 中间件函数参数 
   - 中间件函数接收两个参数：`ctx` 和 `next`。 
   - `ctx` 是一个上下文对象，包含了当前加载文件的相关信息。 
   - `ctx.url`：文件的 URL 地址。 
   - `ctx.result`：用于存储中间件处理后的结果。 
   - `ctx.element`：如果使用声明式加载文件，则为加载文件的标签。 
   - `next` 是一个函数，用于调用下一个中间件。 
4. 中间件函数逻辑
   - 中间件函数可以根据需要自定义处理逻辑，例如加载文件、处理文件内容等。 
   - 通过修改 `ctx.result` 可以存储处理后的结果供后续中间件或代码使用。 
5. 执行 `next()` 函数 
   - 在中间件函数中，务必在适当的位置调用 `next()` 函数，以便执行下一个中间件。 
   - 如果没有调用 `next()`，后续的中间件将不会执行。

下面是一个示例，演示如何使用 `lm.use` 方法扩展支持 `.txt` 文件的加载和处理：

```javascript
lm.use("txt", async (ctx, next) => {
  const { url } = ctx;

  // 可以在此处进行文件加载逻辑
  const response = await fetch(url);
  const text = await response.text();

  // 在 ctx.result 中存储处理后的结果
  ctx.result = text;

  // 调用 next() 函数，执行下一个中间件
  next();
});
```

在上述示例中，中间件函数加载了 `.txt` 文件的内容，并将结果存储在 `ctx.result` 中。通过调用 `next()` 函数，确保下一个中间件可以继续处理文件。

通过以上步骤，你可以使用 `lm.use` 方法来扩展 drill.js 的功能，支持更多其他类型的文件加载和处理。根据需要编写自定义的中间件函数，处理特定文件类型的逻辑，并在中间件函数中使用 `ctx.result` 存储结果供后续代码使用。