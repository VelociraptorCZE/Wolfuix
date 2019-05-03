/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import DynamicComponentParser from "./_DynamicComponentParser/DynamicComponentParser.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class DynamicComponent {
    constructor(content = "", target, options = {}) {
        this.newTarget = target;
        this.content = (typeof content === "string" ? content : this.target.innerHTML).replace(/\n/g, "");
        this.options = options;
        this.parser = new DynamicComponentParser();
        this.wolfuixAttrsToNativeAttrs = [
            { native: "src", wolfuix: "data-wolfuix-src" },
            { native: "href", wolfuix: "data-wolfuix-src" }
        ];
        this.invokedErrors = {
            foreach: false,
            var: false
        }
    }

    set newTarget(target) {
        const _target = WolfuixElemFactory.getElem(target);
        if (!_target) {
            this.target = document.body;
            console.warn(WolfuixWarn.exceptions.DOM_Exception(target, "As the target is currently set document.body as the default fallback."));
        }
        else {
            this.target = _target;
        }
    }

    bind(context) {
        this.parser.newContext = context;
        return this;
    }

    render({ target, content, parser, options, wolfuixAttrsToNativeAttrs } = this) {
        const loops = DynamicComponentParser.getLoops(content);
        if (loops) {
            loops.forEach(loop => {
                try {
                    content = parser.parseForeach(loop, content);
                }
                catch (e) {
                    if (!this.invokedErrors.foreach) {
                        const fail = WolfuixWarn.exceptions.componentForeachFailure(e);
                        console.warn(fail.main);
                        console.warn(...fail.pattern);
                        this.invokedErrors.foreach = true;
                    }
                }
            });
        }
        const variables = DynamicComponentParser.getVariables(content);
        try {
            content = variables ? parser.parseVariables(variables, content) : content;
        }
        catch (e) {
            if (!this.invokedErrors.var) {
                console.warn(WolfuixWarn.exceptions.componentVarFailure(e));
                this.invokedErrors.var = true;
            }
        }

        if (options.enableEval) {
            const ifBlocks = DynamicComponentParser.getIfStatements(content);
            if (ifBlocks) {
                ifBlocks.forEach(ifBlock => {
                    content = parser.parseIfStatement(ifBlock, content);
                });
            }
        }

        target.innerHTML = content;

        if (options.enableEval) {
            const elsWithClickListener = [...target.querySelectorAll("[data-wolfuix-click]")];

            elsWithClickListener.forEach(el => {
                el.addEventListener("click", Function(el.getAttribute("data-wolfuix-click")).bind(parser.context));
                el.removeAttribute("data-wolfuix-click")
            });
        }

        wolfuixAttrsToNativeAttrs.forEach(attr => {
            const elsWithAttr = [...target.querySelectorAll(`[${attr.wolfuix}]`)];

            elsWithAttr.forEach(el => {
                el.setAttribute(attr.native, el.getAttribute(attr.wolfuix));
                el.removeAttribute(attr.wolfuix);
            });
        });
    }
}
