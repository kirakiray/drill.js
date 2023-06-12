# 開發插件的細節

當擴展 drill.js 庫的功能以支援更多類型的文件時，可以遵循以下步驟： 
1. 查看原始碼 
   - 首先，你可以查看 drill.js 的[原始碼](https://github1s.com/kirakiray/drill.js/blob/main/src/use.mjs) ，了解它是如何支援現有文件類型的加載和處理的。 
   - 官方的 [use 示範代碼](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html) ； 
   - 官方支援 `less` 插件的[原始碼](https://github1s.com/kirakiray/drill.js/blob/main/libs/less/src/init.js) ； 
2. 使用 `lm.use` 方法 
   - drill.js 提供了 `lm.use` 方法來擴展文件類型的支援。 
   - `lm.use` 方法接受兩個參數：`fileType` 和 `middleware` 函數。 
   - `fileType` 是要擴展的文件類型，可以是字串或字串陣列，用於匹配文件的擴展名。 
   - `middleware` 函數是一個中介軟體函數，用於處理加載和處理特定文件類型的邏輯。 
3. 中介軟體函數參數 
   - 中介軟體函數接收兩個參數：`ctx` 和 `next`。 
   - `ctx` 是一個上下文物件，包含了目前加載文件的相關資訊。 
   - `ctx.url`：文件的 URL 地址。 
   - `ctx.result`：用於存儲中介軟體處理後的結果。 
   - `ctx.element`：如果使用聲明式加載文件，則為加載文件的標籤。 
   - `next` 是一個函數，用於調用下一個中介軟體。 
4. 中介軟體函數邏輯
   - 中介軟體函數可以根據需要自定義處理邏輯，例如加載文件、處理文件內容等。 
   - 通過修改 `ctx.result` 可以存儲處理後的結果供後續中介軟體或程式碼使用。 
5. 執行 `next()` 函數 
   - 在中介軟體函數中，務必在適當的位置調用 `next()` 函數，以便執行下一個中介軟體。 
   - 如果沒有調用 `next()`，後續的中介軟體將不會執行。

以下是一個示例，演示如何使用 `lm.use` 方法擴展支援 `.txt` 文件的加載和處理：

```javascript
lm.use("txt", async (ctx, next) => {
  const { url } = ctx;

  // 可以在此處進行文件加載邏輯
  const response = await fetch(url);
  const text = await response.text();

  // 在 ctx.result 中存儲處理後的結果
  ctx.result = text;

  // 調用 next() 函數，執行下一個中介軟體
  next();
});
```

在上述示例中，中介軟體函數加載了 `.txt` 文件的內容，並將結果存儲在 `ctx.result` 中。通過調用 `next()` 函數，確保下一個中介軟體可以繼續處理文件。

透過以上步驟，你可以使用 `lm.use` 方法來擴展 drill.js 的功能，支援更多其他類型的文件加載和處理。根據需要撰寫自定義的中介軟體函數，處理特定文件類型的邏輯，並在中介軟體函數中使用 `ctx.result` 存儲結果供後續程式碼使用。