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