# Details of Developing Plugins

When extending the functionality of the drill.js library to support additional types of files, you can follow the steps below: 
1. Review the source code 
   - First, you can review the [source code](https://github1s.com/kirakiray/drill.js/blob/main/src/use.mjs)  of drill.js to understand how it supports the loading and handling of existing file types. 
   - Official [use example code](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html) . 
   - Source code for the official `less` plugin's [support](https://github1s.com/kirakiray/drill.js/blob/main/libs/less/src/init.js) . 
2. Use the `lm.use` method 
   - drill.js provides the `lm.use` method to extend the support for file types. 
   - The `lm.use` method takes two parameters: `fileType` and the `middleware` function. 
   - `fileType` is the file type to extend, which can be a string or an array of strings used to match the file extensions. 
   - The `middleware` function is a middleware function used to handle the loading and processing logic for specific file types. 
3. Middleware function parameters 
   - The middleware function receives two parameters: `ctx` and `next`. 
   - `ctx` is a context object that contains relevant information about the currently loaded file. 
   - `ctx.url`: The URL address of the file. 
   - `ctx.result`: Used to store the result of the middleware processing. 
   - `ctx.element`: If declarative loading of files is used, this represents the tag of the loaded file. 
   - `next` is a function used to call the next middleware. 
4. Middleware function logic
   - The middleware function can have custom processing logic as needed, such as loading the file, handling its content, etc. 
   - By modifying `ctx.result`, you can store the processed result for use by subsequent middlewares or code. 
5. Execute the `next()` function 
   - In the middleware function, it is essential to call the `next()` function at the appropriate position to execute the next middleware. 
   - If `next()` is not called, the subsequent middlewares will not be executed.

Here's an example demonstrating how to use the `lm.use` method to extend support for loading and handling `.txt` files:

```javascript
lm.use("txt", async (ctx, next) => {
  const { url } = ctx;

  // Perform file loading logic here
  const response = await fetch(url);
  const text = await response.text();

  // Store the processed result in ctx.result
  ctx.result = text;

  // Call the next() function to execute the next middleware
  next();
});
```

In the above example, the middleware function loads the content of a `.txt` file and stores the result in `ctx.result`. By calling the `next()` function, it ensures that the next middleware can continue processing the file.

By following these steps, you can use the `lm.use` method to extend the functionality of drill.js and support loading and handling of other types of files. Write custom middleware functions according to your needs to handle the logic for specific file types and use `ctx.result` to store the results for subsequent code usage.
