/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!Array.from) {
    Array.from = function(target) {
        const result = [];
        for (let i = 0; i < target.length; i++) {
            result.push(target[i]);
        }
        return result;
    }
}

if (!Array.prototype.includes) {
    Array.prototype.includes = function(toFind) {
        const a = this;
        const forNaN = a.map(a => a.toString()).indexOf("NaN");
        const arrayNaN = typeof a[forNaN] !== "string";
        const toFindIsNotString = typeof toFind !== "string";

        return a.indexOf(toFind) !== -1 || (isNaN(toFind) ? forNaN !== -1 && (arrayNaN && toFindIsNotString) : false);
    }
}