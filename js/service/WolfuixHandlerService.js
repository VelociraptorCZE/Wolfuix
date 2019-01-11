/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class WolfuixHandlerService {
    static handler(context, listener, e) {
        let handler;
        if (context.props instanceof Object) {
            handler = context.props[listener + "Handler"];
        }

        if (handler) {
            try {
                if (typeof handler === "function") {
                    handler(e);
                }
            } catch (ex) {
                console.warn(WolfuixWarn.exceptions.handlerException({ e: e, ex: ex }));
            }
        }
    }
}