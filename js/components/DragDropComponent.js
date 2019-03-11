/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class DragDropComponent {
    constructor(target, trigger, cursor = {}) {
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
            { type: ["touchstart", "mousedown"], value: true, target: trigger },
            { type: ["touchend", "mouseup"], value: false, target: window }
        ];

        events.forEach(event => {
            event.type.forEach(evType => {
                event.target.addEventListener(evType, e => {
                    active = event.value;
                    if (active) {
                        const {left, top} = target.getBoundingClientRect();
                        const {clientX, clientY} = (e.touches || [{}])[0];
                        clickCoords.x = (clientX || e.clientX) - left;
                        clickCoords.y = (clientY || e.clientY) - top;
                    }
                }, { passive: true });
            });
        });

        const moveEvents = ["mousemove", "touchmove"];

        moveEvents.forEach(moveEvent => {
            window.addEventListener(moveEvent, ({ clientX, clientY, touches = [{}] }) => {
                const { pageX, pageY } = touches[0];
                if (active) {
                    events = [
                        { type: "left", value: (pageX || clientX + pageXOffset) - clickCoords.x + "px" },
                        { type: "top", value: (pageY || clientY + pageYOffset) - clickCoords.y + "px" }
                    ];
                    events.forEach(event => target.style[event.type] = event.value);
                    this._target.style.cursor = cursor.grabbed || "grabbing";
                }
                else {
                    this._target.style.cursor = cursor.hover || "grab";
                }
            }, { passive: true });
        });
    }
}
