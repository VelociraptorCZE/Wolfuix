/**
 * Wolfuix
 * Copyright (c) Simon Raichl 2019
 * MIT License
 */

export default class Thread {
    static sleep(ms) {
        return new Promise(_ => setTimeout(() => _(), ms));
    }
}