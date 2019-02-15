/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

import "../polyfill/Polyfills.js";

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

    _transformUri(uri) {
        const queries = Object.entries(this.queries);
        if (uri.includes("?")) {
            queries.forEach(q => uri = uri.replace(UriBuilder.__getQueryRegex(q[0]), ""));
            uri[uri.length - 1] !== "&" && (uri += "&");
        }
        const query = (!uri.includes("?") && queries.length > 0 ? "?" : "") + queries.map(entry => entry.join("=")).join("&");
        return (uri + query).replace(/&&/g, "&").replace(/\?&/g, "?");
    }

    static __getQueryRegex(query) {
        return new RegExp(`${query}?=.+?(&|$)`, "g");
    }

    static get currentLocation() {
        return location.href.slice(0, location.href.includes("?") ? location.href.indexOf("?") : void 0)
    }

    setQuery(name, value) {
        this.queries[encodeURIComponent(name)] = encodeURIComponent(value);
    }

    removeQuery(name) {
        delete this.queries[encodeURIComponent(name)];
    }

    toString({ scheme, host, port, path, extraValue } = this) {
        return this._transformUri(scheme + host + (typeof port === "number" ? ":" : "") + port + (path !== "" ? "/" : "") + path + extraValue);
    }
}