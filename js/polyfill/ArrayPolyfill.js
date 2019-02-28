/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!Array.from) {
    Array.from = function(array) {
        return [].slice.call(array);
    }
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        value: function(toFind) {
            return this.some(val => val === toFind || (toFind + "" === "NaN" && val + "" === "NaN") && typeof val === typeof toFind);
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