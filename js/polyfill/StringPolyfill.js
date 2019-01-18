/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!String.prototype.includes) {
    String.prototype.includes = function(toFind) {
        return this.indexOf(toFind) !== -1;
    }
}
