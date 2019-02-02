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
