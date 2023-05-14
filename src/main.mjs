import { loader, processor, setLoader, setProcess } from "./loaders.mjs";

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

export const agent = async (url, opts) => {
  const urldata = new URL(url);
  const { pathname } = urldata;

  const type = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 2);

  const load = loader.get(type);

  let data;

  if (load) {
    data = await load(url, opts);
  } else {
    data = fetch(url);
  }

  const tasks = processor[type];
  if (tasks) {
    tasks.forEach((f) => {
      const args = [url];
      opts && args.push(opts);
      f(...args);
    });
  }

  return data;
};

export default function lm(meta) {
  return createLoad(meta);
}

Object.assign(lm, {
  setLoader,
  setProcess,
});
