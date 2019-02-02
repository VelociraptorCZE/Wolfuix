/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory";
import WolfuixWarn from "../warn/WolfuixWarn";

export default class DragDropComponent {
    constructor(target, trigger) {
        try {
            this.newTarget = target;
            this.trigger = trigger ? WolfuixElemFactory.getElem(trigger) : this.target;
            this.active = false;
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

    init({ trigger, target } = this) {
        let events = [
            { type: "mousedown", value: true, target: trigger },
            { type: "mouseup", value: false, target: window }
        ];
        events.forEach(event => event.target.addEventListener(event.type, () => this.active = event.value));
        window.addEventListener("mousemove", e => {
            if (this.active) {
                const { clientX, clientY } = e;
                events = [
                    { type: "left", value: clientX - target.offsetWidth / 2 + "px" },
                    { type: "top", value: clientY - target.offsetHeight / 2 + "px" },
                    { type: "cursor", value: "grabbing" }
                ];
                events.forEach(event => target.style[event.type] = event.value);
            }
            else {
                [trigger, target].forEach(item => item.style.cursor = "grab");
            }
        });
    }
}