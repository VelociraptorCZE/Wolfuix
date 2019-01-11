/**
 * Random.js
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

export default class Random {
    get _bounds() {
        return {
            min: Number.MIN_SAFE_INTEGER,
            max: Number.MAX_SAFE_INTEGER
        };
    }

    set _bounds(param) {
        console.warn("Bounds can't be rewritten!");
    }

    next(min, max) {
        return Math.round(this.nextFloat(min, max));
    }

    nextFloat(min = this._bounds.min, max = this._bounds.max) {
        return (Math.random() * (max - min) + min);
    }
}