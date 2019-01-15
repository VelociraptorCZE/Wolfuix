/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixFormData {
    constructor(id, allow) {
        this.id = id;
        this.allow = Array.isArray(allow) ? allow : [];
        this.inputs = this.__inputs;

        if (this.inputs instanceof NodeList && this.inputs.length === 0) {
            this.inputs = [];
        }
        this.vals = [];
    }

    get __inputs() {
        let ignoreList = ["button", "hidden", "submit", "radio", "checkbox", "reset"].filter(key => !this.allow.includes(key));
        const inputs = Array.from(WolfuixElemFactory.getElem(`#${this.id} input, #${this.id} select`));
        return inputs.filter(input => !ignoreList.includes(input.type));
    }

    append(name, value) {
        this.vals.push({ name: name, value: value });
    }

    entries() {
        return this.formInputs().map(el => [el.name, /radio|checkbox/.test(el.type) ? el.checked : el.value]);
    }

    formInputs({ inputs, vals } = this) {
        return [...inputs, ...vals];
    }

    keys() {
        return this.values(0);
    }

    serialize() {
        return this.entries().map(entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}&`)
            .join("")
            .slice(0, -1);
    }

    toJSON() {
        return JSON.stringify(this.valuesAsObject());
    }

    values(index = 1) {
        return this.entries().map(entry => entry[index]);
    }

    valuesAsFormData() {
        let data = {};
        try {
            data = new FormData();
            this.entries().forEach(val => {
                data.append(val[0], val[1]);
            });
        }
        catch(e) {
            if (!window.FormData) {
                console.warn(WolfuixWarn.exceptions.nativeFunctionIsNotDefined({ target: "FormData", ex: e }));
            }
        }
        return data;
    }

    valuesAsObject() {
        return this.entries().toObject();
    }

    static deserialize(url) {
        return url.split("&").map(value => value.split("=").map(s => decodeURIComponent(s)));
    }
}