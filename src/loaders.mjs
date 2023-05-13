export const loader = new Map();

export const setLoader = (name, handler) => {
  if (name instanceof Array) {
    name.forEach((name) => loader.set(name, handler));
    return;
  }

  loader.set(name, handler);
};

export const processor = new Map();

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

export const use = (name, func) => {
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
