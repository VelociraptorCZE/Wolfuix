/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

// Libraries
import {} from "./js/lib/Arrays.js";
import WolfuixFormData from "./js/lib/WolfuixFormData.js";
// Polyfills
import {} from "./js/polyfill/Polyfills.js";
// Components
import WolfuixTabLayout from "./js/components/WolfuixTabLayout.js";
import WolfuixListBox from "./js/components/WolfuixListBox.js";
import WolfuixButton from "./js/components/WolfuixButton.js";
// DOM and tools
import WolfuixElemTools from "./js/dom/WolfuixElemTools.js";

export default class Wolfuix {
    static formData(id) {
        return new WolfuixFormData(id);
    }

    static createElement(name, attrs, children, content) {
        return WolfuixElemTools.createElement(name, attrs, children, content);
    }

    get component() {
        return {
            get tabLayout() { return WolfuixTabLayout },
            get listBox() { return WolfuixListBox },
            get button() { return WolfuixButton }
        };
    }
}