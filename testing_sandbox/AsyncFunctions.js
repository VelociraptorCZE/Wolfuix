import Thread from "../js/lib/Thread.js";

export default class AsyncFunctions {
    static async sleepExample(el) {
        el.innerHTML += "Now sleep for one second...<br>";
        await Thread.sleep(1000);
        el.innerHTML += "Done.<br>";
    }
}