import UriBuilder from "../js/lib/UriBuilder.js";

export default class UriBuilderTest {
    constructor() {
        this.uriBuilder = new UriBuilder("", location.href);
        this.rules = [
            ["name", "John Doe"],
            ["age", "23"],
            ["email", "johndoe@sample.com"]
        ];
    }

    getUri({ uriBuilder, rules } = this) {
        rules.forEach(rule => {
            uriBuilder.setQuery(rule[0], rule[1]);
        });
        return uriBuilder.uri;
    }
}