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
            let a = this,
                forNaN = a.map(a => a + "").indexOf("NaN"),
                arrayNaN = typeof a[forNaN] !== "string",
                toFindIsNotString = typeof toFind !== "string";
            return a.indexOf(toFind) !== -1 || (isNaN(toFind) && toFind !== void 0 ? forNaN !== -1 && (arrayNaN && toFindIsNotString) : false);
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
            while (i < array.length) {
                const item = array[i];
                if (Array.isArray(item)) {
                    const rest = array.splice(i + 1);
                    array = array.splice(0, i);
                    item.forEach(sub => array.push(sub));
                    array.push(...rest);
                }
                i++;
            }
            return array;
        }
    });
}