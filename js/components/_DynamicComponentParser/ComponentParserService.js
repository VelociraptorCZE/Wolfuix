export default class ComponentParserService {
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
        return this.getBlock("foreach", content);
    }

    static getIfStatements(content) {
        return this.getBlock("if", content);
    }

    static getBlock(blockName, content) {
        return content.match(new RegExp(`{(\\s+|)${blockName}.+?}.*?{(\\s+|)\\/${blockName}(\\s+|)}`, "g"));
    }

    static unescapeString(string) {
        const toUnescape = [
            ["&gt;", ">"], ["&lt;", "<"],
        ];

        toUnescape.forEach(([entity, char]) => string = string.replace(new RegExp(entity, "g"), char));

        return string;
    }
}