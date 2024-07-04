//! drill.js - v5.3.9 https://github.com/kirakiray/drill.js  (c) 2018-2024 YAO
// const error_origin = "http://127.0.0.1:5793/errors";
const error_origin = "https://ofajs.github.io/ofa-errors/errors";

// 存放错误信息的数据对象
const errors = {};

if (globalThis.navigator && navigator.language) {
  fetch(`${error_origin}/${navigator.language.toLowerCase()}.json`)
    .catch(() => {
      return fetch(`default.json`);
    })
    .then((e) => e.json())
    .then((data) => {
      Object.assign(errors, data);
    });
}
/**
 * 根据键、选项和错误对象生成错误对象。
 *
 * @param {string} key - 错误描述的键。
 * @param {Object} [options] - 映射相关值的选项对象。
 * @param {Error} [error] - 原始错误对象。
 * @returns {Error} 生成的错误对象。
 */
const getErr = (key, options, error) => {
  const desc = getErrDesc(key, options);

  let errObj;
  if (error) {
    errObj = new Error(desc, { cause: error });
  } else {
    errObj = new Error(desc);
  }
  return errObj;
};

/**
 * 根据键、选项生成错误描述
 *
 * @param {string} key - 错误描述的键。
 * @param {Object} [options] - 映射相关值的选项对象。
 * @returns {string} 生成的错误描述。
 */
const getErrDesc = (key, options) => {
  if (!errors[key]) {
    return `Error code: "${key}", please go to https://github.com/ofajs/ofa-errors to view the corresponding error information`;
  }

  let desc = errors[key];

  // 映射相关值
  if (options) {
    for (let k in options) {
      desc = desc.replace(new RegExp(`{${k}}`, "g"), options[k]);
    }
  }

  return desc;
};

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
const wrapFetch = async (url, params) => {
  const d = new URL(url);

  const reUrl = params.includes("-direct") ? url : `${d.origin}${d.pathname}`;

  let fetchObj = caches.get(reUrl);

  if (!fetchObj) {
    fetchObj = fetch(reUrl);
    caches.set(reUrl, fetchObj);
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
      const err = getErr(
        "load_module",
        {
          url: ctx.realUrl || url,
        },
        error
      );

      if (notHttp) {
        console.log("load failed:", ctx.realUrl || url, " ctx:", ctx);
      }

      throw err;
    }
  }

  await next();
});

use(["txt", "html", "htm"], async (ctx, next) => {
  if (!ctx.result) {
    const { url, params } = ctx;

    let resp;
    try {
      resp = await wrapFetch(url, params);
    } catch (error) {
      throw getErr("load_fail", { url }, error);
    }

    if (!/^2.{2}$/.test(resp.status)) {
      throw getErr("load_fail_status", {
        url,
        status: resp.status,
      });
    }

    ctx.result = await resp.text();
  }

  await next();
});

use("json", async (ctx, next) => {
  if (!ctx.result) {
    const { url, params } = ctx;

    ctx.result = await wrapFetch(url, params).then((e) => e.json());
  }

  await next();
});

use("wasm", async (ctx, next) => {
  if (!ctx.result) {
    const { url, params } = ctx;

    const data = await wrapFetch(url, params).then((e) => e.arrayBuffer());

    const module = await WebAssembly.compile(data);
    const instance = new WebAssembly.Instance(module);

    ctx.result = instance.exports;
  }

  await next();
});

use("css", async (ctx, next) => {
  if (!ctx.result) {
    const { url, element, params } = ctx;

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
      ctx.result = await wrapFetch(url, params).then((e) => e.text());
    }
  }

  await next();
});

const aliasMap = {};

async function config(opts) {
  const { alias } = opts;

  if (alias) {
    Object.entries(alias).forEach(([name, path]) => {
      if (!/^@.+/.test(name)) {
        throw getErr("config_alias_name_error", {
          name,
        });
      }

      if (!aliasMap[name]) {
        if (!/^\./.test(path)) {
          aliasMap[name] = path;
        } else {
          throw getErr("alias_relate_name", {
            name,
            path,
          });
        }
      } else {
        throw getErr("alias_already", {
          name,
        });
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

  let lastUrl = url;

  if (/^@/.test(url)) {
    const [first, ...args] = url.split("/");

    if (aliasMap[first]) {
      lastUrl = [aliasMap[first].replace(/\/$/, ""), ...args].join("/");
    } else {
      throw getErr("no_alias", {
        name: first,
        url: moduleName,
      });
    }
  }

  if (typeof location !== "undefined") {
    const base = baseURI ? new URL(baseURI, location.href) : location.href;

    const moduleURL = new URL(lastUrl, base);

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
    let [url, ...params] = ourl.split(" ");

    const reurl = path(url, meta.url);

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
    const result = await fetch(url);
    const contentType = result.headers.get("Content-Type");

    const targetMapObject = [
      ["application/javascript", "js"],
      ["application/json", "json"],
      ["text/html", "html"],
      ["text/xml", "xml"],
    ].find((e) => contentType.includes(e[0]));

    let newOni;
    if (targetMapObject) {
      newOni = processor[targetMapObject[1]];
    }

    if (newOni) {
      await newOni.run(ctx);
    } else {
      ctx.result = result;
    }
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

Object.defineProperties(lm$1, {
  use: {
    value: use,
  },
  alias: {
    get() {
      return { ...aliasMap };
    },
  },
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
