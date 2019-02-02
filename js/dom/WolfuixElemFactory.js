/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixElemFactory {
    static getElems(o, strict = true, context) {
        if (typeof o === "object") {
            Object.keys(o).forEach(k1 => {
                if (typeof o[k1] === "object") {
                    Object.keys(o[k1]).forEach(k2 => {
                        o[k1][k2] = this.getElems(o[k1][k2], strict, context);
                    });
                }
                else {
                    const temp = o[k1];
                    o[k1] = this.getElem(o[k1], context);
                    WolfuixElemFactory.throwException(o[k1], temp, strict);
                }
            });
        }
        else {
            const temp = o;
            o = this.getElem(o, context);
            WolfuixElemFactory.throwException(o, temp, strict);
        }
        return o;
    }

    static getElem(selector, context = document) {
        return selector instanceof Element ? selector :
        (/[.#\[\]=,* ]/.test(selector) ? context.querySelectorAll(selector) : context.getElementById(selector));
    }

    static throwException(target, selector, strict) {
        if ((!target || (target instanceof NodeList && target.length === 0)) && strict) {
            console.warn(WolfuixWarn.exceptions.DOM_Exception(selector || target));
        }
    }
}