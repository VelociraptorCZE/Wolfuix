/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixWarn from "../warn/WolfuixWarn.js";
import WolfuixElemFactory from "./WolfuixElemFactory";

export default class WolfuixElemTools {
    static createElement(name = "div", attrs = {}, children = [], content = "", contentPosition = "afterbegin") {
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

        children.forEach(child => {
            elem.appendChild(child);
        });

        elem.insertAdjacentHTML(contentPosition, content);

        return elem;
    }

    static getElementPosition(element) {
        element = WolfuixElemFactory.getElem(element);
        const rect = element.getBoundingClientRect();
        rect.topAbsolute = rect.top + window.pageYOffset;
        rect.leftAbsolute = rect.left + window.pageXOffset;
        return rect;
    }

}

if (!Node.prototype.insertAfter) {
    Node.prototype.insertAfter = function(newNode, referenceNode) {
        this.insertBefore(newNode, referenceNode.nextSibling);
    };
}