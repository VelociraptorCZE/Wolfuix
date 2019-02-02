/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class DynamicComponentParser {
    constructor() {
        this.foreachEnd = "{(\\s+|)/foreach(\\s+|)}";
    }

    set newContext(context) {
        this.context = context;
    }

    _parseVariable(variable, content) {
        let tempVar = DynamicComponentParser._getVarName(variable), parsedVar;
        parsedVar = this._getVar(tempVar);
        return content.replace(variable, parsedVar);
    }

    parseVariables(variables, content) {
        variables.forEach(variable => {
            content = this._parseVariable(variable, content);
        });
        return content;
    }

    _getVar(tempVar) {
        let parsedVar;
        tempVar = tempVar.split(".");
        for (let i = 0; i < tempVar.length; i++) {
            parsedVar = parsedVar ? parsedVar[tempVar[i]] : this.context[tempVar[i]];
        }
        return parsedVar;
    }

    parseForeach(foreach, content, { foreachEnd } = this) {
        let newContent = "";
        const loopExpression = foreach.replace(/ /g, "")
            .match(/{foreach:.+:[\w,]+?}/g)[0].split(":");

        const loop = {
            collection: loopExpression[1],
            var: DynamicComponentParser._getForeachArgs(loopExpression[2]),
            content: foreach.match(new RegExp(`}.+${foreachEnd}`, "g"))
                [0].slice(1).replace(new RegExp(foreachEnd), "")
        };

        const collection = this._getVar(loop.collection);
        let vars = DynamicComponentParser.getVariables(loop.content);
        vars.forEach((v, i) => {
            const _var = v.replace(/ /g, "");
            loop.content = loop.content.replace(v, _var);
            vars[i] = _var;
        });

        collection.forEach((item, iteration) => {
            let foreachVars = [loop.var[0], loop.var[1]].filter(v => v !== void 0),
                tempContent = loop.content,
                args = [item, iteration];

            foreachVars.forEach(foreachVar => {
                tempContent = tempContent.replace(new RegExp(foreachVar, "g"), args[0]);
                args.shift();
            });

            tempContent = this.parseVariables(vars, tempContent);
            newContent += tempContent;
        });

        return content.replace(foreach, newContent);
    }

    static _getForeachArgs(arg) {
        return arg.replace("}", "").split(",").map(_var => `{{${_var}}}`);
    }

    static _getVarName(variable) {
        return variable.replace(/[{ }]/g, "");
    }

    static getVariables(content) {
        return content.match(/{{.+?}}/g);
    }

    static getLoops(content) {
        return content.match(/{(\s+|)foreach.+?}.*?{(\s+|)\/foreach(\s+|)}/g);
    }
}