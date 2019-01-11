/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixBaseComponent from "./WolfuixBaseComponent.js";

export default class WolfuixListBox extends WolfuixBaseComponent {
    constructor(elem, props) {
        super(elem, props);
        this._activeElem = 0;
        this.elem = this.elem.children;
        this.props.classOnActive = props.classOnActive ? props.classOnActive : "active";
        this._appendListener();
    }

    _appendListener() {
        const { elem } = this;
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener("click", e => {
                this._activeElem = i;
                this.setActive(i);
            });
            super._appendListener(this.elem[i]);
        }
    }

    setActive(activeItem = this._activeElem, { elem, props } = this) {
        this._activeElem = activeItem;
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove(props.classOnActive);
        }
        elem[activeItem].classList.add(props.classOnActive);
    }

    get value() {
        return this.elem[this._activeElem].innerText;
    }
}

