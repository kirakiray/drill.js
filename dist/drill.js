//! drill.js - v5.2.2 https://github.com/kirakiray/drill.js  (c) 2018-2023 YAO
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lm = factory());
})(this, (function () { 'use strict';

  const getOid = () => Math.random().toString(32).slice(2);

  class Onion {
    constructor() {
      this._middlewares = new Map();
    }

    use(middleware) {
      const oid = getOid();
      this._middlewares.set(oid, middleware);
      return oid;
    }

    unuse(oid) {
      return this._middlewares.delete(oid);
    }

    async run(context) {
      let index = -1;

      const middlewares = Array.from(this._middlewares.values());

      const next = async () => {
        index++;
        if (index < middlewares.length) {
          await middlewares[index](context, next);
        }
      };

      await next();
    }
  }

  const processor = {};

  const addHandler = (name, handler) => {
    const oni = processor[name] || (processor[name] = new Onion());
    oni.use(handler);
  };

  const use = (name, handler) => {
    if (name instanceof Function) {
      handler = name;
      name = ["js", "mjs"];
    }

    if (name instanceof Array) {
      name.forEach((name) => {
        addHandler(name, handler);
      });
      return;
    }

    addHandler(name, handler);
  };

  use(["mjs", "js"], async (ctx, next) => {
    if (!ctx.result) {
      const { url, params } = ctx;
      const d = new URL(url);
      if (
        /^blob:/.test(url) ||
        /^data:/.test(url) ||
        params.includes("-direct")
      ) {
        ctx.result = await import(url);
      } else {
        ctx.result = await import(`${d.origin}${d.pathname}`);
      }
    }

    await next();
  });

  use(["txt", "html", "htm"], async (ctx, next) => {
    if (!ctx.result) {
      const { url } = ctx;
      ctx.result = await fetch(url).then((e) => {
        if (/^2.{2}$/.test(e.status)) {
          return e.text();
        }

        throw new Error(`Load ${url} failed: status code ${e.status}`);
      });
    }

    await next();
  });

  use("json", async (ctx, next) => {
    if (!ctx.result) {
      const { url } = ctx;

      ctx.result = await fetch(url).then((e) => e.json());
    }

    await next();
  });

  use("wasm", async (ctx, next) => {
    if (!ctx.result) {
      const { url } = ctx;

      const data = await fetch(url).then((e) => e.arrayBuffer());

      const module = await WebAssembly.compile(data);
      const instance = new WebAssembly.Instance(module);

      ctx.result = instance.exports;
    }

    await next();
  });

  use("css", async (ctx, next) => {
    if (!ctx.result) {
      const { url, element } = ctx;

      if (element) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;

        const root = element.getRootNode();

        if (root === document) {
          root.head.append(link);
        } else {
          root.appendChild(link);
        }

        let f;
        element.addEventListener(
          "disconnected",
          (f = (e) => {
            link.remove();
            element.removeEventListener("disconnected", f);
          })
        );
      } else {
        ctx.result = await fetch(url).then((e) => e.text());
      }
    }

    await next();
  });

  const LOADED = Symbol("loaded");

  const createLoad = (meta) => {
    if (!meta) {
      meta = {
        url: document.location.href,
      };
    }
    const load = (ourl) => {
      let reurl = "";
      const [url, ...params] = ourl.split(" ");

      if (meta.resolve) {
        reurl = meta.resolve(url);
      } else {
        const currentUrl = new URL(meta.url);
        const resolvedUrl = new URL(url, currentUrl);
        reurl = resolvedUrl.href;
      }

      return agent(reurl, { params });
    };
    return load;
  };

  const agent = async (url, opts) => {
    const urldata = new URL(url);
    const { pathname } = urldata;

    let type;

    opts.params &&
      opts.params.forEach((e) => {
        if (/^\..+/.test(e)) {
          type = e.replace(/^\.(.+)/, "$1");
        }
      });

    if (!type) {
      type = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 2);
    }

    const ctx = {
      url,
      result: null,
      ...opts,
    };

    const oni = processor[type];

    if (oni) {
      await oni.run(ctx);
    } else {
      ctx.result = fetch(url);
    }

    if (opts && opts.element) {
      const { element } = opts;
      element[LOADED] = true;
      const event = new Event("load");
      element.dispatchEvent(event);
    }

    if (opts.params && opts.params.includes("-ctx")) {
      return ctx;
    }

    return ctx.result;
  };

  function lm(meta) {
    return createLoad(meta);
  }

  Object.assign(lm, {
    use,
  });

  class LoadModule extends HTMLElement {
    constructor(...args) {
      super(...args);

      this[LOADED] = false;

      Object.defineProperties(this, {
        loaded: {
          get: () => this[LOADED],
        },
      });

      this._init();
    }

    _init() {
      if (this.__initSrc || this.attributes.hasOwnProperty("pause")) {
        return;
      }

      let src = this.getAttribute("src");

      if (!src) {
        return;
        // throw `The ${this.tagName.toLowerCase()} element requires the src attribut `;
      }
      this.__initSrc = src;

      src = new URL(src, location.href).href;
      Object.defineProperties(this, {
        src: {
          configurable: true,
          value: src,
        },
      });

      const [url, ...params] = src.split(" ");

      agent(url, {
        element: this,
        params,
      });
    }

    connectedCallback() {
      const event = new CustomEvent("connected");
      event.root = this._root = this.getRootNode();
      this.dispatchEvent(event);
    }

    disconnectedCallback() {
      const event = new CustomEvent("disconnected");
      event.root = this._root;
      delete this._root;
      this.dispatchEvent(event);
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
      } else if (name === "pause" && newValue === null) {
        this._init();
      }
    }

    static get observedAttributes() {
      return ["src", "pause"];
    }
  }

  class LM extends LoadModule {
    constructor(...args) {
      super(...args);
    }
  }

  const ready = () => {
    customElements.define("load-module", LoadModule);
    customElements.define("l-m", LM);
    window.removeEventListener("load", ready);
  };

  if (document.readyState === "complete") {
    ready();
  } else {
    window.addEventListener("load", ready);
  }

  window.lm = lm;

  return lm;

}));
