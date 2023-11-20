//! drill.js - v5.3.3 https://github.com/kirakiray/drill.js  (c) 2018-2023 YAO
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

const caches = new Map();
const wrapFetch = async (url) => {
  let fetchObj = caches.get(url);

  if (!fetchObj) {
    fetchObj = fetch(url);
    caches.set(url, fetchObj);
  }

  const resp = await fetchObj;

  return resp.clone();
};

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

    const notHttp = /^blob:/.test(url) || /^data:/.test(url);
    try {
      if (notHttp || params.includes("-direct")) {
        ctx.result = await import(url);
      } else {
        ctx.result = await import(`${d.origin}${d.pathname}`);
      }
    } catch (error) {
      const err = wrapError(
        `Failed to load module ${ctx.realUrl || url}`,
        error
      );

      if (notHttp) {
        console.log("Failed to load module:", ctx);
      }

      throw err;
    }
  }

  await next();
});

use(["txt", "html", "htm"], async (ctx, next) => {
  if (!ctx.result) {
    const { url } = ctx;

    let resp;
    try {
      resp = await wrapFetch(url);
    } catch (error) {
      throw wrapError(`Load ${url} failed`, error);
    }

    if (!/^2.{2}$/.test(resp.status)) {
      throw new Error(`Load ${url} failed: status code ${resp.status}`);
    }

    ctx.result = await resp.text();
  }

  await next();
});

use("json", async (ctx, next) => {
  if (!ctx.result) {
    const { url } = ctx;

    ctx.result = await wrapFetch(url).then((e) => e.json());
  }

  await next();
});

use("wasm", async (ctx, next) => {
  if (!ctx.result) {
    const { url } = ctx;

    const data = await wrapFetch(url).then((e) => e.arrayBuffer());

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
      ctx.result = await wrapFetch(url).then((e) => e.text());
    }
  }

  await next();
});

const wrapError = (desc, error) => {
  const err = new Error(`${desc} \n  ${error.toString()}`);
  err.error = error;
  return err;
};

const aliasMap = {};

async function config(opts) {
  const { alias } = opts;

  if (alias) {
    Object.entries(alias).forEach(([name, path]) => {
      if (/^@.+/.test(name)) {
        if (!aliasMap[name]) {
          if (!/^\./.test(path)) {
            aliasMap[name] = path;
          } else {
            throw `The address does not match the specification, please use '/' or or the beginning of the protocol: '${path}'`;
          }
        } else {
          throw `Alias already exists: '${name}'`;
        }
      }
    });
  }
  return true;
}

const path = (moduleName, baseURI) => {
  if (moduleName.startsWith("http://") || moduleName.startsWith("https://")) {
    return moduleName;
  }

  const [url, ...params] = moduleName.split(" ");

  let lastUrl = "";

  if (/^@/.test(url)) {
    const [first, ...args] = url.split("/");

    if (aliasMap[first]) {
      lastUrl = [aliasMap[first].replace(/\/$/, ""), ...args].join("/");

      return lastUrl;
    } else {
      throw `No alias defined ${first}`;
    }
  } else {
    const base = baseURI ? new URL(baseURI, location.href) : location.href;

    const moduleURL = new URL(url, base);

    lastUrl = moduleURL.href;
  }

  if (params.length) {
    return `${lastUrl} ${params.join(" ")}`;
  }

  return lastUrl;
};

const LOADED = Symbol("loaded");

const createLoad = (meta, opts) => {
  if (!meta) {
    meta = {
      url: document.location.href,
    };
  }
  const load = (ourl) => {
    let reurl = "";
    let [url, ...params] = ourl.split(" ");

    // Determine and splice the address of the alias
    const urlMathcs = url.split("/");
    if (/^@.+/.test(urlMathcs[0])) {
      if (aliasMap[urlMathcs[0]]) {
        urlMathcs[0] = aliasMap[urlMathcs[0]];
        url = urlMathcs.join("/");
      } else {
        throw `Can't find an alias address: '${urlMathcs[0]}'`;
      }
    }

    if (meta.resolve) {
      reurl = meta.resolve(url);
    } else {
      const currentUrl = new URL(meta.url);
      const resolvedUrl = new URL(url, currentUrl);
      reurl = resolvedUrl.href;
    }

    return agent(reurl, { params, ...opts });
  };
  return load;
};

const agent = async (url, opts) => {
  const urldata = new URL(url);
  const { pathname } = urldata;

  let type;
  let realUrl = null;

  opts.params &&
    opts.params.forEach((e) => {
      if (/^\..+/.test(e)) {
        type = e.replace(/^\.(.+)/, "$1");
      } else if (/^\-\-real/.test(e)) {
        realUrl = e.replace(/^\-\-real\:/, "");
      }
    });

  if (!type) {
    type = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 2);
  }

  const ctx = {
    url,
    result: null,
    realUrl,
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

function lm$1(meta, opts) {
  return createLoad(meta, opts);
}

Object.assign(lm$1, {
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

    const load = lm(undefined, {
      element: this,
    });

    load(src);

    Object.defineProperties(this, {
      src: {
        configurable: true,
        value: src,
      },
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

lm$1.config = config;
lm$1.path = path;
Object.freeze(lm$1);

window.lm = lm$1;

export { lm$1 as default };
