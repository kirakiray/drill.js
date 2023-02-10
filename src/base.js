((glo) => {
    "use strict";
    //<!--public-->
    //<!--processor-->
    //<!--loaders-->
    //<!--agent-->
    //<!--distribution-->
    //<!--main-->

    const load = (glo.load = (...args) => new Drill(...args));

    const config = (opts) => {
        let { paths } = opts;
        if (paths) {
            // Shortcut path
            Object.keys(paths).forEach((k) => {
                let val = paths[k];

                // Definitions that do not start/end with @ are not legal
                if (!/^@.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                    };
                }

                if (!/.+\/$/.test(k)) {
                    throw {
                        desc: "incorrect definition of paths",
                        key: k,
                        path: val,
                    };
                }

                // pathsMap.set(k, val);
                pathsMap.set(new RegExp(`^` + k), val);
            });
        }
    };

    const drill = {
        load,
        config,
        // Whether the resource has been loaded
        async has(src) {
            let path = await load(`${src} -link`);

            return !!getBag(path);
        },
        // Delete this resource cache
        async remove(src) {
            let path = await load(`${src} -link`);
            let record = getBag(path);

            // Delete Mounted Elements
            let sele = record.sourceElement;
            if (sele) {
                sele.parentNode.removeChild(sele);
            }

            // Delete cached data
            bag.delete(path);
        },
        // Secondary development extension method
        ext(callback) {
            callback({
                bag,
                addLoader,
                addProcess,
            });
        },
        bag,
        version: "{{version}}",
        v: "{{versionCode}}",
    };

    // Global Functions
    defineProperties(glo, {
        drill: {
            value: drill,
        },
    });
})(typeof globalThis != "undefined" ? globalThis : window);
