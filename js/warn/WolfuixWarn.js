/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2018 - 2019
 * MIT License
 */

export default class WolfuixWarn {
    static get exceptions() {
        const shared = "[WolfuixWarn]:";
        return {
            DOM_Exception: (params, comment = "") => {
                return `${shared} Invalid operation with the DOM: ${params} is the invalid selector! ${comment}`;
            },
            onAttrGetFail: params => {
                return `${shared} Cannot get attributes from the ${params.type}\n\n${params.ex}`;
            },
            handlerException: params => {
                return `${shared} Error occured while running a handler on ${params.e}\n\n${params.ex}`;
            },
            nativeFunctionIsNotDefined: params => {
                return `${shared} Cannot run this function or constructor, because ${params.target} does not exist in your version of ES.
                
                ${params.ex}`;
            },
            componentForeachFailure: params => {
                return {main: `${shared} Failed to parse a foreach in your source, probably the bad pattern or bad parameters?\n\n${params}\n\nCorrect pattern:\n`,
                        pattern: ["%c{foreach : collection : item} //source {/foreach}", "color:blue;font-weight:700"]};
            },
            componentVarFailure: params => {
                return `${shared} Failed to parse a variable in your source, probably the bad context?\n\n${params}`;
            }
        }
    }
}