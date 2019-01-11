/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixFormData {
    constructor(id) {
        this.id = id;
        this.inputs = WolfuixElemFactory.getElem("#" + id + " input");
        if (this.inputs instanceof NodeList && this.inputs.length === 0) {
            this.inputs = [];
        }
        this.vals = [];
    }

    append(name, value) {
        this.vals.push({ name: name, value: value });
    }

    entries() {
        const entries = [];
        this.formInputs().forEach(el => {
            entries.push([el.name, el.value]);
        });
        return entries;
    }


    formInputs({ inputs, vals } = this) {
        return [...inputs, ...vals];
    }

    keys() {
        return this.values(0);
    }

    serialize() {
        let url = "";
        this.entries().forEach(entry => {
           url += encodeURIComponent(entry[0]) + "=" + encodeURIComponent(entry[1]) + "&";
        });
        url = url.slice(0, url.length - 1);
        return url;
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
            this.formInputs().forEach(val => {
                data.append(val.name, val.value);
            });
        }
        catch(e) {
            if (typeof FormData === "undefined") {
                console.warn(WolfuixWarn.exceptions.nativeFunctionIsNotDefined({ target: "FormData", ex: e }));
            }
        }
        return data;
    }

    valuesAsObject() {
        const o = {};
        this.formInputs().forEach(val => {
            o[val.name] = val.value;
        });
        return o;
    }
}