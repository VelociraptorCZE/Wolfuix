/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixElemTools {
    static createElement(name = "div", attrs = {}, children = [], content = "") {
        const elem = document.createElement(name);

        try {
            Object.keys(attrs).forEach(attr => {
                elem.setAttribute(attr, attrs[attr]);
            });
        }
        catch (e) {
            console.warn(WolfuixWarn.exceptions.onAttrGetFail({type: typeof attrs, ex: e}));
        }

        if (!Array.isArray(children) && !(children instanceof NodeList)) {
            content = String(children);
            children = [];
        }

        elem.innerHTML = content;

        children.forEach(child => {
            elem.appendChild(child);
        });

        return elem;
    }
}

if (!Node.prototype.insertAfter) {
    Node.prototype.insertAfter = function(newNode, referenceNode) {
        this.insertBefore(newNode, referenceNode.nextSibling);
    };
}