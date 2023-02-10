const loaders = new Map();

// function for adding loaders
const addLoader = (type, callback) => {
    loaders.set(type, (src) => {
        const record = getBag(src);

        record.type = type;

        return callback({
            src,
            record,
        });
    });
};

addLoader("js", ({ src, record }) => {
    return new Promise((resolve, reject) => {
        // main script element
        let script = document.createElement("script");

        script.type = "text/javascript";
        script.async = true;
        script.src = src;

        // Mounted script element
        record.sourceElement = script;

        script.addEventListener("load", async () => {
            // Script load completion time
            record.loadedTime = Date.now();

            // Determine if a resource has been set to loading or completed status
            if (record.status == 0) {
                record.ptype = "script";

                // No 1 or 2 state, it means it's a normal js file, just execute done
                record.done((pkg) => {});
            }

            resolve();
        });
        script.addEventListener("error", (event) => {
            // load error
            reject({
                desc: "load script error",
                event,
            });
        });

        document.head.appendChild(script);
    });
});

addLoader("mjs", async ({ src, record }) => {
    let d = await import(src);

    record.done(() => d);
});

addLoader("wasm", async ({ src, record }) => {
    let data = await fetch(src).then((e) => e.arrayBuffer());

    let module = await WebAssembly.compile(data);
    const instance = new WebAssembly.Instance(module);

    record.done(() => instance.exports);
});

addLoader("json", async ({ src, record }) => {
    let data = await fetch(src);

    data = await data.json();

    record.done(() => data);
});

addLoader("css", async ({ src, record }) => {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = src;

    record.sourceElement = link;

    let isAppend = false;

    record.done(async (pkg) => {
        if (pkg.params.includes("-unpull")) {
            // If there is an unpull parameter, the link element is returned and not added to the head
            return link;
        }

        // By default it is added to the head and does not return a value
        if (!isAppend) {
            document.head.appendChild(link);
            isAppend = true;
        }

        // Wait if not finished loading
        if (!link.sheet) {
            await new Promise((resolve) => {
                link.addEventListener("load", (e) => {
                    resolve();
                });
            });
        }
    });
});

// The following types return utf8 strings
["html"].forEach((name) => {
    addLoader(name, async ({ src, record }) => {
        let data = await fetch(src).then((e) => e.text());

        record.done(() => data);
    });
});

const loadByFetch = async ({ src, record }) => {
    let response = await fetch(src);

    if (!response.ok) {
        throw {
            desc: "fetch " + response.statusText,
            response,
        };
    }

    // Reset getPack
    record.done(() => response);
};
