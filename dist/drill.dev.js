// drill.js - v5.0.0 https://github.com/kirakiray/drill.js  (c) 2018-2023 YAO
(function () {
  'use strict';

  const loader = new Map();

  const setLoader = (name, handler) => {
    if (name instanceof Array) {
      name.forEach((name) => loader.set(name, handler));
      return;
    }

    loader.set(name, handler);
  };

  const processor = new Map();

  setLoader(["mjs", "js"], async (url, opts) => {
    const data = await import(url);
    for (let f of processor.values()) {
      const args = [data];
      if (opts) {
        args.push(opts);
      }

      await f(...args);
    }
    return data;
  });

  const use = (name, func) => {
    if (processor.has(name)) {
      throw `${name} processor already exists`;
    }

    processor.set(name, func);
  };

  setLoader(["txt", "html"], (url) => {
    return fetch(url).then((e) => e.text());
  });

  setLoader("json", async (url) => {
    return fetch(url).then((e) => e.json());
  });

  setLoader("wasm", async (url) => {
    const data = await fetch(url).then((e) => e.arrayBuffer());

    const module = await WebAssembly.compile(data);
    const instance = new WebAssembly.Instance(module);

    return instance.exports;
  });

  const createLoad = (meta) => {
    const load = (url) => {
      let reurl = "";
      if (meta.resolve) {
        reurl = meta.resolve(url);
      } else {
        const currentUrl = new URL(meta.url);
        const resolvedUrl = new URL(url, currentUrl);
        reurl = resolvedUrl.href;
      }

      return agent(reurl);
    };
    return load;
  };

  const agent = async (url, opts) => {
    const urldata = new URL(url);
    const { pathname } = urldata;

    const type = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 2);

    const load = loader.get(type);

    if (load) {
      return load(url, opts);
    }

    return fetch(url);
  };

  function lm(meta) {
    return createLoad(meta);
  }

  Object.assign(lm, {
    setLoader,
    use,
  });

  class LoadModule extends HTMLElement {
    constructor(...args) {
      super(...args);

      this._init();
    }

    _init() {
      let src = this.getAttribute("src");

      if (!src) {
        return;
        // throw `The ${this.tagName.toLowerCase()} element requires the src attribut `;
      }
      this.__initSrc = src;
      src = new URL(src, location.href, src).href;
      agent(src, {
        element: this,
      });
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "src") {
        if (newValue && oldValue === null) {
          this._init();
        } else if (this.__initSrc && oldValue && newValue !== this.__initSrc) {
          console.warn(
            `${this.tagName.toLowerCase()} change src is invalid, only the first change will be loaded`
          );
          this.setAttribute("src", this.__initSrc);
        }
      }
    }

    static get observedAttributes() {
      return ["src"];
    }
  }

  class LM extends LoadModule {
    constructor(...args) {
      super(...args);
    }
  }

  customElements.define("load-module", LoadModule);
  customElements.define("l-m", LM);

  if (typeof window !== "undefined") {
    window.lm = lm;
  }

  if (typeof module === "object") {
    module.exports = lm;
  }

})();
