/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import WolfuixHandlerService from "../service/WolfuixHandlerService.js";
import WolfuixListenerList from "../service/WolfuixListenerList.js";

export default class WolfuixBaseComponent {
    constructor(elems, props = {}) {
        this.el = WolfuixElemFactory;
        this.elem = this.el.getElems(elems);
        this.props = props instanceof Object ? props : {};
        this.listeners = WolfuixListenerList;
        this._appendListener();
    }

    _appendListener(el) {
        const elem = el || this.elem;
        if (elem instanceof Element) {
            this.listeners.forEach(listener => {
                elem.addEventListener(listener, e => {
                    WolfuixHandlerService.handler(this, listener, e);
                });
            });
        }
    }
}