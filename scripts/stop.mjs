import os from "node:os";
import process from "node:process";
import {basename} from "node:path";
import fkill from "fkill";
import {commands} from "./commands.mjs";

// get operating system
const platform = os.platform();

console.log(`\x1b[32mStop sciter.js sandbox...\x1b[0m\n`);

// close existing inspector
try {
    await fkill(basename(commands["inspector"][platform]));
}
catch (error) {
    //console.error(error);
}

// close existing scapp
try {
    await fkill(basename(commands["scapp"][platform]));
}
catch (error) {
    //console.error(error);
}

// close existing usciter
try {
    await fkill(basename(commands["usciter"][platform]));
}
catch (error) {
    //console.error(error);
}
