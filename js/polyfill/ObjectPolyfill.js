/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

if (!Object.entries) {
    Object.entries = function (o) {
        return o instanceof Object ? Object.keys(o).map(k => [k, o[k]]) : [];
    }
}

if (!Object.values) {
    Object.values = function (o) {
        return Object.entries(o).map(a => a[1]);
    }
}