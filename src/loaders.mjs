export const loader = new Map();
export const processor = {};

export const setProcess = (name, handler) => {
  if (name) {
    handler = name;
    name = ["js", "mjs"];
  }
  if (name instanceof Array) {
    name.forEach((name) => {
      const tasks = processor[name] || (processor[name] = []);
      tasks.push(handler);
    });
    return;
  }

  const tasks = processor[name] || (processor[name] = []);
  tasks.push(handler);
};

export const setLoader = (name, handler) => {
  if (name instanceof Array) {
    name.forEach((name) => loader.set(name, handler));
    return;
  }

  loader.set(name, handler);
};

setLoader(["mjs", "js"], (url) => {
  return import(url);
});

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
