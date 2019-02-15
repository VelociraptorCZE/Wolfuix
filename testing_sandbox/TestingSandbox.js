import UriBuilderTest from "./UriBuilderTest.js";
import AsyncFunctions from "./AsyncFunctions.js";
import WolfuixElemTools from "../js/dom/WolfuixElemTools.js";

let el = WolfuixElemTools.createElement("div", { id: "js-wolfuix-testing-sandbox", style: "padding:1rem" });
document.body.appendChild(el);

const uriBuilderTest = new UriBuilderTest();
uriBuilderTest.uriBuilder.host = uriBuilderTest.getUri();

el.innerHTML += uriBuilderTest.uriBuilder.host + "<br>";

uriBuilderTest.rules = [
    ["name", "Another name"]
];
el.innerHTML += uriBuilderTest.getUri() + "<br>";

uriBuilderTest.rules = [
    ["name", "Simon"],
    ["age", 19]
];

uriBuilderTest.uriBuilder.removeQuery("email");

el.innerHTML += uriBuilderTest.getUri() + "<br>";

AsyncFunctions.sleepExample(el);