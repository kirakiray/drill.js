import { loader, setLoader, use } from "./loaders.mjs";

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

  if (load) {
    return load(url, opts);
  }

  return fetch(url);
};

export default function lm(meta) {
  return createLoad(meta);
}

Object.assign(lm, {
  setLoader,
  use,
});
