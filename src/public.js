// function
// 获取随机id
const getRandomId = () => Math.random().toString(32).substr(2);
var objectToString = Object.prototype.toString;
var getType = value => objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
const isFunction = d => getType(d).search('function') > -1;
var isEmptyObj = obj => !(0 in Object.keys(obj));

//改良异步方法
const nextTick = (() => {
    const pnext = (func) => Promise.resolve().then(() => func());

    if (typeof process === "object" && process.nextTick) {
        pnext = process.nextTick;
    }

    return pnext;
})();
