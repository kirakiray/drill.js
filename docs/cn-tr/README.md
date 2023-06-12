# drill.js

## 簡介

`drill.js` 是一個強化版的 web 加載工具，旨在讓前端開發擺脫對 Node.js 的依賴。它提供了豐富的擴展功能，並支持聲明式加載模組。

與傳統的前端開發方式相比，`drill.js` 提供了更靈活的加載和處理模組的方式，使前端開發更加便捷和高效。

## 官方擴展 

- [drill-less](https://github.com/kirakiray/drill.js/tree/main/libs/less) ：讓瀏覽器直接支持 `.less` 檔案；

## 安裝

可以通過以下方式之一來安裝 `drill.js`： 
- 通過 CDN 引入：
在 HTML 檔案的 `<head>` 部分引入以下腳本標籤：

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
```


- 通過套件管理器安裝：
使用 npm 或 yarn 等套件管理工具進行安裝：

```shell
npm install drill.js
```


## 初始化

在使用 `drill.js` 之前，需要在 HTML 檔案中引入 `drill.js` 腳本以初始化環境。建議將初始化腳本放在 HTML 檔案的 `<head>` 部分。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <!-- 其他 head 部分的內容 -->
</head>
<body>
   <!-- 頁面內容 -->
</body>
</html>
```


## 加載模組

在 ES 模組環境下，可以使用 `lm` 方法進行模組加載。以下是加載 `test-module.mjs` 模組的示例：

[點擊我查看程式碼](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-module/index.html) 

[點擊我查看效果](https://kirakiray.github.io/drill.js/examples/load-module/) 

```javascript
// target/test-module.mjs
export const getDesc = () => {
  return "I am target/test-module.mjs";
};
```



```html
<!DOCTYPE html>
<html lang="zh-TW">
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



通過 `load` 方法加載模組，可以使用異步 `import` 相同的語法。加載的模組可以通過 `test` 變數訪問模組的導出內容。
## 聲明式加載

通過 `<load-module>` 或 `<l-m>` 標籤可以進行聲明式加載模組，類似於使用 `<script>` 標籤加載模組。

```html
<load-module src="path/to/the/module.mjs"></load-module>
<!-- 或 -->
<l-m src="path/to/the/module.mjs"></l-m>
```



這種方式與傳統的 `<script>` 標籤具有相同的效果，可以方便地聲明加載模組。
## 擴展檔案類型支援

可以通過 `lm.use` 方法擴展 `drill.js` 對特定檔案類型的支援。以下是擴展支援 `.json` 檔案的示例：

```javascript
use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((e) => e.json());

  next();
});
```



使用類似 Koa 的中間件機制，通過設置 `ctx.result` 返回相應的內容。可以使用 `lm.use` 擴展更多檔案類型的支援。

官方[已支援的類型示例程式碼](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-more-type/index.html) ；查看[線上效果](https://kirakiray.github.io/drill.js/examples/load-more-type/) ；
## 模組預處理

可以使用 `lm.use` 方法對模組資料進行預處理。以下是一個預處理元件註冊資料的示例：

[點擊我查看效果](https://kirakiray.github.io/drill.js/examples/lm-use/) 

[點擊我查看程式碼](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html) ；

```html

<!DOCTYPE html>
<html lang="zh-TW">
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

在預處理中，可以根據模組的類型和內容進行相應的操作。上述示例中，將元件註冊資料處理為自定義元素。

以上是 `drill.js` 的部分使用文件內容。繼續編寫剩下的內容，包括示例和用法，常見問題解答，API 參考等。

關於開發外掛程式的詳細資訊，[請點擊查閱](./plug-ins.md) 。