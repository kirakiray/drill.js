# drill.js

## Einführung

`drill.js` ist ein erweitertes Web-Lade-Tool, das darauf abzielt, Frontend-Entwickler von der Abhängigkeit von Node.js zu befreien. Es bietet umfangreiche Erweiterungsfunktionen und unterstützt deklaratives Modulladen.

Im Vergleich zu herkömmlichen Frontend-Entwicklungsmethoden bietet `drill.js` eine flexiblere Möglichkeit, Module zu laden und zu verarbeiten, was die Frontend-Entwicklung bequemer und effizienter macht.

## Offizielle Erweiterungen 

- [drill-less](https://github.com/kirakiray/drill.js/tree/main/libs/less) : Ermöglicht die direkte Unterstützung von `.less`-Dateien im Browser.

## Installation

Sie können `drill.js` auf eine der folgenden Arten installieren: 
- CDN: Fügen Sie das folgende Skript-Tag im `<head>`-Bereich Ihrer HTML-Datei ein:

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
```

- Paketmanager: Verwenden Sie npm, yarn oder ein beliebiges anderes Paketverwaltungstool, um zu installieren:

```shell
npm install drill.js
```

## Initialisierung

Bevor Sie `drill.js` verwenden, müssen Sie das `drill.js`-Skript in Ihrer HTML-Datei einbinden, um die Umgebung zu initialisieren. Es wird empfohlen, das Initialisierungsskript im `<head>`-Bereich der HTML-Datei zu platzieren.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Meine Webseite</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
    <!-- Weitere Inhalte des Head-Bereichs -->
</head>
<body>
   <!-- Seiteninhalt -->
</body>
</html>
```

## Modulladen

In einer ES-Modul-Umgebung können Sie die Methode `lm` verwenden, um Module zu laden. Hier ist ein Beispiel für das Laden des Moduls `test-module.mjs`:

[Klicken Sie hier, um den Code anzuzeigen](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-module/index.html) 

[Klicken Sie hier, um die Live-Demo anzuzeigen](https://kirakiray.github.io/drill.js/examples/load-module/) 

```javascript
// target/test-module.mjs
export const getDesc = () => {
  return "Ich bin target/test-module.mjs";
};
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Modul laden</title>
    <script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
  </head>
  <body>
    <script type="module">
      const load = lm(import.meta);

      (async () => {
          const test = await load("./target/test-module.mjs");

        document.write(test.getDesc());
        console.log(test.getDesc()); // => Ich bin target/test-module.mjs
      })();
    </script>
  </body>
</html>
```

Sie können die Methode `load` verwenden, um Module mit der gleichen Syntax wie asynchrones `import` zu laden. Das geladene Modul kann über die Variable `test` auf die exportierten Inhalte des Moduls zugreifen.

## Deklaratives Laden

Mit den `<load-module>`- oder `<l-m>`-Tags können Module deklarativ geladen werden, ähnlich wie beim Laden mit dem `<script>`-Tag.

```html
<load-module src="Pfad/zum/Modul.mjs"></load-module>
<!-- Oder -->
<l-m src="Pfad/zum/Modul.mjs"></l-m>
```

Diese Methode hat die gleiche Wirkung wie der herkömmliche `<script>`-Tag und ermöglicht eine bequeme deklarative Modulladung.
## Unterstützung für Dateitypen erweitern

Mit der Methode `lm.use` können Sie die Unterstützung von `drill.js` für bestimmte Dateitypen erweitern. Hier ist ein Beispiel zur Erweiterung der Unterstützung für `.json`-Dateien:

```javascript
use("json", async (ctx, next) => {
  const { url } = ctx;

  ctx.result = await fetch(url).then((e) => e.json());

  next();
});
```

Mit einem Middleware-Mechanismus ähnlich wie Koa können Sie `ctx.result` festlegen, um den entsprechenden Inhalt zurückzugeben. Sie können `lm.use` verwenden, um die Unterstützung für weitere Dateitypen zu erweitern.

Schauen Sie sich den [Beispielcode](https://github1s.com/kirakiray/drill.js/blob/main/examples/load-more-type/index.html)  für offiziell unterstützte Typen an und sehen Sie sich auch die [Live-Demo](https://kirakiray.github.io/drill.js/examples/load-more-type/)  dazu an.
## Modulvorverarbeitung

Mit der Methode `lm.use` können Sie Moduldaten vorverarbeiten. Hier ist ein Beispiel zur Registrierung von Daten zur Vorverarbeitung von Komponenten:

[Klicken Sie hier, um die Live-Demo anzuzeigen](https://kirakiray.github.io/drill.js/examples/lm-use/) 

[Klicken Sie hier, um den Code anzuzeigen](https://github1s.com/kirakiray/drill.js/blob/main/examples/lm-use/index.html) 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Modulvorverarbeitung</title>
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

export const content = "Hallo Welt! Dies ist mein benutzerdefiniertes Element.";

export const style = {
  color: "rot",
  padding: "10px",
  margin: "10px",
  backgroundColor: "#eee",
};
```

Bei der Vorverarbeitung können Sie je nach Modultyp und Inhalt entsprechende Aktionen durchführen. In dem obigen Beispiel werden die Registrierungsdaten für Komponenten zu benutzerdefinierten Elementen verarbeitet.

Dies sind einige der Verwendungsdokumentationen für `drill.js`. Fahren Sie mit dem Schreiben des restlichen Inhalts fort, einschließlich Beispielen, Verwendungshinweisen, häufig gestellten Fragen, API-Referenz usw.

Für weitere Details zur Entwicklung von Plugins, [klicken Sie hier](./plug-ins.md) .