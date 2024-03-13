import Study from "./Study.js";
import Play from "./Play.js";
class Main {
    apps = [];
    constructor() {
        this.apps[1] = new Study();
        this.apps[2] = new Play();
    }
}
while (true) {
    console.log("Is it working?");
}
