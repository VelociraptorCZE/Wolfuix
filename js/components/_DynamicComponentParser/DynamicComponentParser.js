/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */
import ComponentParserService from "./ComponentParserService";

export default class DynamicComponentParser extends ComponentParserService {
    constructor() {
        super();
        this.foreachEnd = "{(\\s+|)/foreach(\\s+|)}";
        this.ifRegex = {
            start: "{\\s*if.*?}",
            end: "{\\s*\\/if\\s*}"
        }
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

            if (iterationNum) {
                tempContent = tempContent.replace(new RegExp(iterationNum, "g"), iteration);
            }

            loop.varsToParse.forEach(varToParse => {
                const objProps = DynamicComponentParser.getObjectProperties(varToParse);
                tempContent = tempContent.replace(
                    varToParse, `{{${loop.collection}.${iteration}${objProps}`
                );
            });

            tempContent = this.parseVariables(vars, tempContent);
            newContent += tempContent;
        });

        return content.replace(foreach, newContent);
    }

    parseIfStatement(ifBlock, content) {
        const { ifRegex } = this;
        const ifStatementRegex = RegExp(`(${ifRegex.end})|(${ifRegex.start})`, "g");

        const parsedIfStatement = ifBlock.match(RegExp(ifRegex.start))
            .toString()
            .trim()
            .replace(/({\s*if)|(}$)/g, "");

        const condition = Function(`return ${parsedIfStatement}`).bind(this.context);

        if (condition()) {
            content = content.replace(RegExp(ifStatementRegex), "");
        }
        else {
            content = content.replace(ifBlock, "");
        }

        return content;
    }

}