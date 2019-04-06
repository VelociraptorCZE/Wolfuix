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
        const [, targetCollection, foreachVars] = foreach.replace(/ /g, "")
            .match(/{foreach:.+:[\w,]+?}/g)[0].split(":");

        const loop = {
            collection: targetCollection,
            var: DynamicComponentParser._getForeachArgs(foreachVars),
            content: foreach.match(new RegExp(`}.+${foreachEnd}`, "g"))[0]
                .slice(1)
                .replace(new RegExp(foreachEnd), "")
        };

        const collection = this._getVar(loop.collection);
        // Just to replace all spaces in variable blocks with the empty string
        let vars = DynamicComponentParser.getVariables(loop.content);
        vars.forEach((v, i) => {
            const _var = v.replace(/ /g, "");
            loop.content = loop.content.replace(v, _var);
            vars[i] = _var;
        });

        loop.varsToParse = loop.content
            .match(new RegExp(`{{(\\s+|)${DynamicComponentParser._getVarName(loop.var[0])}(\\.|).*?(\\s+|)}}`, "g"));

        collection.forEach((item, iteration) => {
            let iterationNum = loop.var[1],
                tempContent = loop.content;

            loop.varsToParse.forEach(varToParse => {
                const objProps = DynamicComponentParser.getObjectProperties(varToParse);
                tempContent = tempContent.replace(
                    varToParse, `{{${loop.collection}.${iteration}${objProps}`
                );
            });

            if (iterationNum) {
                tempContent = tempContent.replace(new RegExp(iterationNum, "g"), iteration);
            }

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

    static getObjectProperties(varName) {
        const vName = varName.split(".")[0];
        return varName.replace(vName, "") || "}}";
    }

    static getLoops(content) {
        return content.match(/{(\s+|)foreach.+?}.*?{(\s+|)\/foreach(\s+|)}/g);
    }
}