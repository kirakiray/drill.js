// functions
const getRandomId = () => Math.random().toString(32).substr(2);
const objectToString = Object.prototype.toString;
const getType = (value) =>
    objectToString
        .call(value)
        .toLowerCase()
        .replace(/(\[object )|(])/g, "");
const isFunction = (d) => getType(d).search("function") > -1;
const isEmptyObj = (obj) => !(0 in Object.keys(obj));

const { defineProperties } = Object;

const nextTick = (() => {
    const pnext = (func) => Promise.resolve().then(() => func());

    if (typeof process === "object" && process.nextTick) {
        pnext = process.nextTick;
    }

    return pnext;
})();
