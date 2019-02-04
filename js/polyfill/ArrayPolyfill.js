/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!Array.from) {
    Array.from = function(target) {
        let result = [];
        if (typeof target === "string") {
            result = target.split("");
        }
        else {
            for (let i = 0; i < target.length; i++) {
                result.push(target[i]);
            }
        }
        return result;
    }
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        value: function(toFind) {
            const a = this;
            const forNaN = a.map(a => a.toString()).indexOf("NaN");
            const arrayNaN = typeof a[forNaN] !== "string";
            const toFindIsNotString = typeof toFind !== "string";
            return a.indexOf(toFind) !== -1 || (isNaN(toFind) ? forNaN !== -1 && (arrayNaN && toFindIsNotString) : false);
        }
    });
}

if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, "fill", {
        value: function(value) {
            for (let i = 0; i < this.length; i++) {
                this[i] = value;
            }
            return this;
        }
    });
}

if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, "flat", {
        value: function() {
            let array = this, i = 0;
            while (true) {
                const item = array[i];
                if (Array.isArray(item)) {
                    const rest = array.splice(i + 1);
                    array = array.splice(0, i);
                    item.forEach(sub => array.push(sub));
                    array.push(...rest);
                }
                i++;
                if (i >= array.length) {
                    break;
                }
            }
            return array;
        }
    });
}