/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import "../polyfill/Polyfills.js";

if (!NodeList.prototype.addEventListener) {
    Object.defineProperty(NodeList.prototype, "addEventListener", {
        value: function (event, callback, settings) {
            Array.from(this).forEach(node => {
                node.addEventListener(event, callback, settings);
            });
        }
    });
}

if (!HTMLCollection.prototype.addEventListener) {
    Object.defineProperty(HTMLCollection.prototype, "addEventListener", {
        value: NodeList.prototype.addEventListener
    });
}