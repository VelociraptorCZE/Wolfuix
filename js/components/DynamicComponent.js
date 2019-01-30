/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import WolfuixElemFactory from "../dom/WolfuixElemFactory.js";
import DynamicComponentParser from "./DynamicComponentParser.js";
import WolfuixWarn from "../warn/WolfuixWarn.js";

export default class DynamicComponent {
    constructor(content, target) {
        this.target = WolfuixElemFactory.getElem(target);
        this.content = (typeof content === "string" ? content : this.target.innerHTML).replace(/\n/g, "");
        this.parser = new DynamicComponentParser();
        this.invokedErrors = {
            foreach: false
        }
    }

    bind(context) {
        this.parser.newContext = context;
        return this;
    }

    render({ target, content, parser } = this) {
        const loops = content.match(/{(\s+|)foreach.+?}.*?{(\s+|)\/foreach(\s+|)}/g);
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

        const variables = parser.getVariables(content);
        if (variables) {
            content = variables ? parser.parseVariables(variables, content) : content;
        }

        target.innerHTML = content;
    }
}
