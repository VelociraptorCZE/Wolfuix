/**
 * Arrays.js library for Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

if (!Array.prototype.copy) {
    Array.prototype.copy = function(fromArray, index = 0, length = 1) {
        const array = this;
        array.push(...fromArray.splice(index, length));
        return array;
    };
}

if (!Array.prototype.intersect) {
    Array.prototype.intersect = function(withArray) {
        const array = this;
        return array.filter(item => withArray.includes(item));
    };
}

if (!Array.prototype.toObject) {
    Array.prototype.toObject = function() {
        const o = {};
        this.forEach(item => {
            o[item[0]] = item[1];
        });
        return o;
    }
}