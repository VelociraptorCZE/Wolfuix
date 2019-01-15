/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class UriBuilder {
    constructor(scheme = "https://", host = "", port = "", path = "", extraValue = "") {
        this.scheme = scheme;
        this.host = host;
        this.port = port;
        this.path = path;
        this.extraValue = extraValue;
    }

    get uri() {
        return this.toString();
    }

    toString({ scheme, host, port, path, extraValue } = this) {
        return scheme + host + (typeof port === "number" ? ":" : "") + port + (path !== "" ? "/" : "") + path + extraValue;
    }
}