/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import {} from "../polyfill/Polyfills.js";
import {} from "./Arrays.js";
import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixFormData {
    constructor(id, allow) {
        this.id = id;
        this.allow = Array.isArray(allow) ? allow : [""];
        this.inputs = this.__inputs;

        if (this.inputs instanceof NodeList && this.inputs.length === 0) {
            this.inputs = [];
        }
        this.vals = [];
    }

    get _form() {
        const { id } = this;
        return id instanceof Element ? id : WolfuixElemFactory.getElem(id);
    }

    get __inputs() {
        const { allow } = this;
        const inputs = Array.from(WolfuixElemFactory.getElem("input, select, textarea", this._form));
        let ignoreList, allowParticularInputs;

        if (allow[0].includes("allow only")) {
            allowParticularInputs = allow[0].replace(/allow only| /g, "").split(",");
        }
        else {
            ignoreList = ["button", "hidden", "submit", "radio", "checkbox", "reset"].filter(key => !allow.includes(key));
            allow.forEach(item => item[0] === "!" ? ignoreList.push(item.slice(1)) : 0);
        }

        return inputs.filter(input =>
            ignoreList ? !ignoreList.includes(input.type) : allowParticularInputs.includes(input.type)
        );
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