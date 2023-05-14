// Process handling operations for js types
const processor = new Map();

// Functions for adding process types
const addProcess = (name, callback) => {
    processor.set(name, callback);

    defineProperties(glo, {
        [name]: {
            value: (respone) => {
                let nowSrc = document.currentScript.src;

                // Check if there is a record
                let record = getBag(nowSrc);

                if (!record) {
                    record = new BagRecord(nowSrc);
                    setBag(nowSrc, record);
                }

                // Set the loading status
                record.status = 1;

                record.ptype = name;

                callback({
                    respone,
                    record,
                    relativeLoad(...args) {
                        let repms = new Drill(...args);

                        // Set relative directory
                        repms.__relative__ = nowSrc;

                        return repms;
                    },
                });
            },
        },
    });
};

// Initial module type: define
addProcess("define", async ({ respone, record, relativeLoad }) => {
    // Functions for returning module content
    let getPack;

    if (isFunction(respone)) {
        const exports = {};

        // Run first to return results
        let result = await respone({
            load: relativeLoad,
            FILE: record.src,
            exports,
        });

        if (result === undefined && !isEmptyObj(exports)) {
            result = exports;
        }

        getPack = (pkg) => {
            return result;
        };
    } else {
        // Assign the result directly
        getPack = (pkg) => {
            return respone;
        };
    }

    // Return the getPack function
    record.done(getPack);
});

// Initial module type: task
addProcess("task", async ({ respone, record, relativeLoad }) => {
    if (!isFunction(respone)) {
        throw "task must be a function";
    }

    record.done(async (pkg) => {
        return await respone({
            data: pkg.data,
            load: relativeLoad,
            FILE: record.src,
        });
    });
});
