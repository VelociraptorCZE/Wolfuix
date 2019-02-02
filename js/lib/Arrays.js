/**
 * Arrays.js library for Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import {} from "../polyfill/Polyfills.js";

if (!Array.prototype.copy) {
    Object.defineProperty(Array.prototype, "copy", {
        value: function(fromArray, index = 0, length = 1) {
            const array = this;
            array.push(...fromArray.splice(index, length));
            return array;
        }
    });
}

if (!Array.prototype.intersect) {
    Object.defineProperty(Array.prototype, "intersect", {
        value: function(withArray) {
            return this.filter(item => withArray.includes(item));
        }
    });
}

if (!Array.prototype.toObject) {
    Object.defineProperty(Array.prototype, "toObject", {
        value: function() {
            const o = {};
            this.forEach(item => {
                o[item[0]] = item[1];
            });
            return o;
        }
    });
}

if (!Array.prototype.like) {
    Object.defineProperty(Array.prototype, "like", {
        value: function(query) {
            return this.filter(item => item.includes(query));
        }
    });
}