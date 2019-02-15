/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

// Polyfills
import "./js/polyfill/Polyfills.js";
// Libraries
import "./js/lib/Arrays.js";
import WolfuixFormData from "./js/lib/WolfuixFormData.js";
// Components
import WolfuixTabLayout from "./js/components/WolfuixTabLayout.js";
import DynamicComponent from "./js/components/DynamicComponent.js";
import WolfuixButton from "./js/components/WolfuixButton.js";
// DOM and tools
import WolfuixElemTools from "./js/dom/WolfuixElemTools.js";
import "./js/dom/AddEventListener.js";

export default class Wolfuix {
    static formData(id, allow) {
        return new WolfuixFormData(id, allow);
    }

    static get createElement() {
        return WolfuixElemTools.createElement;
    }

    get component() {
        return {
            get tabLayout() { return WolfuixTabLayout },
            get dynamicComponent() { return DynamicComponent },
            get button() { return WolfuixButton }
        };
    }
}
