/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class ImageReader {
    constructor (file = {}) {
        this.file = file;
    }

    set file (file) {
        this._file = file.getAsFile ? file.getAsFile() : file;
    }

    getAsBase64 (throwError) {
        const { _file } = this;

        if (!window.Promise) {
            console.warn(WolfuixWarn.exceptions.nativeFunctionIsNotDefined({ target: "Promise" }));
            return false;
        }

        return new Promise(send => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                send(fileReader.result);
            };

            try {
                fileReader.readAsDataURL(_file);
            }
            catch (e) {
                if (throwError) {
                    console.warn(WolfuixWarn.exceptions.wrongType({
                        ex: e,
                        type: _file.constructor.name,
                        desiredType: "Blob"
                    }));
                }
            }
        });
    }
}