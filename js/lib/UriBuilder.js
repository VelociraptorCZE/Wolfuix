/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import {} from "../polyfill/Polyfills.js";

export default class UriBuilder {
    constructor(scheme = "https://", host = "", port = "", path = "", extraValue = "") {
        this.scheme = scheme;
        this.host = host;
        this.port = port;
        this.path = path;
        this.extraValue = extraValue;
        this.queries = {};
    }

    get uri() {
        return this.toString();
    }

    get _queries() {
        return "?" + Object.entries(this.queries).map(entry => entry.join("=")).join("&");
    }

    static get currentLocation() {
        return location.href.slice(0, location.href.includes("?") ? location.href.indexOf("?") : void 0)
    }

    setQuery(name, value) {
        this.queries[encodeURIComponent(name)] = encodeURIComponent(value);
    }

    toString({ scheme, host, port, path, extraValue, _queries } = this) {
        return scheme + host + (typeof port === "number" ? ":" : "") + port + (path !== "" ? "/" : "") + path + extraValue + _queries;
    }
}