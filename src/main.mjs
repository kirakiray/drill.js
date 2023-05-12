export default function lm(meta) {
  return createLoad(meta);
}

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

const agent = async (url) => {
  const urldata = new URL(url);
  const { pathname } = urldata;

  const type = pathname.slice(((pathname.lastIndexOf(".") - 1) >>> 0) + 2);

  const load = loader.get(type);

  if (load) {
    return load(url);
  }

  debugger;
};

const loader = new Map([
  [
    "mjs",
    (url) => {
      return import(url);
    },
  ],
  [
    "txt",
    (url) => {
      return fetch(url).then((e) => e.text());
    },
  ],
]);
