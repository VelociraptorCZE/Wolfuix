/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class DynamicComponentParser {
    set newContext(context) {
        this.context = context;
    }

    _parseVariable(variable, content) {
        let tempVar = this._getVarName(variable), parsedVar;
        parsedVar = this._getVar(tempVar, this.context);
        return content.replace(variable, parsedVar);
    }

    parseVariables(variables, content) {
        variables.forEach(variable => {
            content = this._parseVariable(variable, content, this.context);
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

    parseForeach(foreach, content) {
        let newContent = "";
        const loopExpression = foreach.replace(/ /g, "").match(/{foreach:.+:[\w,]+?}/g)[0].split(":");

        const loop = {
            collection: loopExpression[1],
            var: this._getForeachArgs(loopExpression[2]),
            content: foreach.match(/}.+{(\s+|)\/foreach(\s+|)}/g)[0].slice(1).replace(/{(\s+|)\/foreach(\s+|)}/, "")
        };

        const collection = this._getVar(loop.collection, this.context);
        let vars = this.getVariables(loop.content);
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

    _getForeachArgs(arg) {
        return arg.replace("}", "").split(",").map(_var => `{{${_var}}}`);
    }

    _getVarName(variable) {
        return variable.replace(/[{ }]/g, "");
    }

    getVariables(content) {
        return content.match(/{{.+?}}/g);
    }
}