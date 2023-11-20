export const aliasMap = {};

export default async function config(opts) {
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

export const path = (moduleName, baseURI) => {
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
