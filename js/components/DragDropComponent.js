/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class DragDropComponent {
    constructor(target, trigger, cursor) {
        try {
            this.newTarget = target;
            this.trigger = trigger ? WolfuixElemFactory.getElem(trigger) : this.target;
            this.active = false;
            this.clickCoords = {};
            this.cursor = cursor;
            this.init();
        }
        catch (e) {
            WolfuixWarn.exceptions.DOM_Exception(e);
        }
    }

    set newTarget(target) {
        this.target = WolfuixElemFactory.getElem(target);
        this.target.style.position = "absolute";
    }

    get _target() {
        return this.target === this.trigger ? this.target : this.trigger;
    }

    init({ trigger, target, active, clickCoords, cursor } = this) {
        let events = [
            { type: "mousedown", value: true, target: trigger },
            { type: "mouseup", value: false, target: window }
        ];

        events.forEach(event => event.target.addEventListener(event.type, e => {
            active = event.value;
            if (active) {
                const { left, top } = target.getBoundingClientRect();
                clickCoords.x = e.clientX - left;
                clickCoords.y = e.clientY - top;
            }
        }));

        window.addEventListener("mousemove", e => {
            if (active) {
                events = [
                    { type: "left", value: e.clientX - clickCoords.x + "px" },
                    { type: "top", value: e.clientY - clickCoords.y + "px" }
                ];
                events.forEach(event => target.style[event.type] = event.value);
                this._target.style.cursor = cursor || "grabbing";
            }
            else {
                this._target.style.cursor = cursor || "grab";
            }
        });
    }
}
