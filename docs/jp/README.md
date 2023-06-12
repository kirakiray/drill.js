# drill.js

## 概要

`drill.js`は、フロントエンド開発者がNode.jsに依存しないようにするための強化版ウェブローダーツールです。多機能な拡張機能を提供し、モジュールの宣言的なロードをサポートしています。

従来のフロントエンド開発手法と比較して、`drill.js`はモジュールのロードと処理をより柔軟に行うことができ、フロントエンド開発をより便利かつ効率的にします。
## 公式拡張機能 
- [drill-less](https://github.com/kirakiray/drill.js/tree/main/libs/less) ：ブラウザで`.less`ファイルを直接サポートします。
## インストール

`drill.js`をインストールするには、次のいずれかの方法を使用できます： 
- CDNを使用してインポートする場合：
HTMLファイルの`<head>`セクションで、以下のスクリプトタグをインポートします。

```html

<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
```


- パッケージマネージャーを使用してインストールする場合：
npmやyarnなどのパッケージマネージャーツールを使用してインストールします。

```shell
npm install drill.js
```


## 初期化

`drill.js`を使用する前に、HTMLファイルで`drill.js`スクリプトをインポートして環境を初期化する必要があります。初期化スクリプトはHTMLファイルの`<head>`セクションに配置することをおすすめします。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Web Page</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <!-- 他のheadセクションのコンテンツ -->
</head>
<body>
   <!-- ページのコンテンツ -->
</body>
</html>
```


## モジュールのロード

ESモジュール環境では、`lm`メソッドを使用してモジュールをロードすることができます。以下は`test-module.mjs`モジュールをロードする例です：

[コードを表示する](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-module/index.html) 

[デモを表示する](https://kirakiray.github.io/drill.js/examples/load-module/) 

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



`load`メソッドを使用してモジュールをロードすることで、非同期の`import`と同じ構文を使用することができます。ロードしたモジュールは`test`変数を介してモジュールのエクスポート内容にアクセスすることができます。
## 宣言的なロード

`<load-module>`または`<l-m>`タグを使用して、モジュールを宣言的にロードすることができます。これは`<script>`タグを使用してモジュールをロードするのと同様の効果を持っています。

```html
<load-module src="path/to/the/module.mjs"></load-module>
<!-- または -->
<l-m src="path/to/the/module.mjs"></l-m>
```



この方法は、従来の`<script>`タグと同様の効果を持ち、モジュールの宣言的なロードを簡単に行うことができます。
## ファイルタイプのサポートの拡張

`lm.use`メソッドを使用して、`drill.js`が特定のファイルタイプをサポートするように拡張することができます。以下は`.json`ファイルのサポートを拡張する例です：

```javascript
use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((e) => e.json());

  next();
});
```



Koaのミドルウェアのような仕組みを使用して、`ctx.result`を設定して適切なコンテンツを返すことができます。`lm.use`を使用して、さらに多くのファイルタイプをサポートできます。

公式の[サポートされているタイプのサンプルコード](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-more-type/index.html) を見ることで、さらに多くの情報を確認できます。オンラインデモもご覧いただけます。
## モジュールの前処理

`lm.use`メソッドを使用して、モジュールデータを前処理することができます。以下は前処理コンポーネント登録データの例です：

[デモを表示する](https://kirakiray.github.io/drill.js/examples/lm-use/) 

[コードを表示する](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html) 

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


前処理では、モジュールのタイプと内容に基づいて適切な操作を行うことができます。上記の例では、コンポーネント登録データをカスタム要素に処理しています。

以上が`drill.js`の一部の使用文書の内容です。残りのコンテンツには、例や使用法、よくある質問への回答、APIリファレンスなどが含まれます。

プラグイン開発の詳細については、[こちらを参照してください](./plug-ins.md) 。