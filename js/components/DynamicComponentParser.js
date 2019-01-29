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
        const loopExpression = foreach.replace(/ /g, "").match(/{foreach:.+:.+?}/g)[0].split(":");
        const loop = {
            collection: loopExpression[1],
            var: `{{${loopExpression[2].replace("}", "")}}}`,
            content: foreach.match(/}.+{(\s+|)\/foreach(\s+|)}/g)[0].slice(1).replace(/{(\s+|)\/foreach(\s+|)}/, "")
        };

        const collection = this._getVar(loop.collection, this.context);
        let vars = this.getVariables(loop.content);
        vars.forEach(_var => loop.content = loop.content.replace(_var, _var.replace(/ /g, "")));
        vars = vars.map(_var => _var.replace(/ /g, ""));

        collection.forEach(item => {
            let varIndex = vars.indexOf(loop.var);
            let tempContent = loop.content.replace(vars[varIndex], item);
            vars = vars.splice(varIndex, 1);
            tempContent = this.parseVariables(vars, tempContent);
            newContent += tempContent;
        });

        return content.replace(foreach, newContent);
    }

    _getVarName(variable) {
        return variable.replace(/[{ }]/g, "");
    }

    getVariables(content) {
        return content.match(/{{.+?}}/g);
    }
}