/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixElemFactory {
    static getElems(o, strict = true) {
        if (typeof o === "object") {
            Object.keys(o).forEach(k1 => {
                if (typeof o[k1] === "object") {
                    Object.keys(o[k1]).forEach(k2 => {
                        o[k1][k2] = this.getElems(o[k1][k2], strict);
                    });
                }
                else {
                    const temp = o[k1];
                    o[k1] = this.getElem(o[k1]);
                    WolfuixElemFactory.throwException(o[k1], temp, strict);
                }
            });
        }
        else {
            const temp = o;
            o = this.getElem(o);
            WolfuixElemFactory.throwException(o, temp, strict);
        }
        return o;
    }

    static getElem(selector) {
        return selector instanceof Element ? selector :
               (/[.#\[\]=,* ]/.test(selector) ? document.querySelectorAll(selector) : document.getElementById(selector));
    }

    static throwException(target, selector, strict) {
        if ((!target || (target instanceof NodeList && target.length === 0)) && strict) {
            console.warn(WolfuixWarn.exceptions.DOM_Exception(selector || target));
        }
    }
}