/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixBaseComponent from "./WolfuixBaseComponent.js";

export default class WolfuixTabLayout extends WolfuixBaseComponent {
    constructor(elems, props) {
        super(elems, props);
        if (!this.props.classOnActive) {
            this.props.classOnActive = "active";
        }
    }

    _appendListener() {
        const { elem } = this;
        elem.forEach(el => {
            el.toggle.addEventListener("click", () => {
                this.toggleContainer(el);
            });
            super._appendListener(el.toggle);
        });

        this.toggleContainer(elem[0]);
    }

    toggleContainer(el) {
        const { elem, props } = this;

        elem.forEach(e => {
            e.container.style.display = "none";
            e.toggle.classList.remove(props.classOnActive);
        });

        if (el) {
            el.container.style.display = "block";
            el.toggle.classList.add(props.classOnActive);
        }
    }
}