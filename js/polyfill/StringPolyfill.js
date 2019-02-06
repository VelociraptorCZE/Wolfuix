/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!String.prototype.includes) {
    Object.defineProperty(String.prototype, "includes", {
        value: function(toFind) {
            return this.indexOf(toFind) !== -1;
        }
    });
}

if (!String.prototype.repeat) {
    Object.defineProperty(String.prototype, "repeat", {
        value: function(n) {
            return n ? Array(n).fill(this).join("") : "";
        }
    });
}