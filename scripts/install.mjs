import fs from "node:fs";
import {exec} from "node:child_process";
import os from "node:os";
import download from "download";

// sciter 4.4.8.22-bis
const sciterSDK = "6cedc57ff09404ad17e1899abc06f843a4677b69";

const commands = {
    "linux": [
        // unzip binaries
        `unzip ${sciterSDK}.zip`,

        // move binaries
        `mv sciter-js-sdk-${sciterSDK}/bin .`,

        // delete old dir
        `rm -rf sciter-js-sdk-${sciterSDK}`,

        // delete zip
        `rm ${sciterSDK}.zip`,

        "cd bin/macosx; chmod +x scapp inspector.app/Contents/MacOS/inspector usciterjs.app/Contents/MacOS/usciterjs libsciter.dylib",
        "cd bin/linux/arm32; chmod +x scapp inspector usciter libsciter-gtk.so",
        "cd bin/linux/x64; chmod +x scapp inspector usciter libsciter-gtk.so",
        "cd bin/linux/x32; chmod +x scapp",
    ],
    "win32": [
        // unzip binaries
        `unzip ${sciterSDK}.zip`,

        // move binaries
        `move sciter-js-sdk-${sciterSDK}\\bin .`,

        // delete old dir
        `rmdir /s /q sciter-js-sdk-${sciterSDK}`,

        // delete zip
        `del ${sciterSDK}.zip`,
    ],
};

console.log(`Download sciter.js SDK ${sciterSDK}...`);

let downloaded = 0;

fs.writeFileSync(`${sciterSDK}.zip`, await download(`https://github.com/c-smile/sciter-js-sdk/archive/${sciterSDK}.zip`)
    .on("response", res => {
        //console.log(res.headers);
        // clear screen
        //console.log("\x1b[2J");
    })
    .on("response", res => {
        res.on("data", data => {
            downloaded += data.length;

            // show download progress
            console.log(`\x1b[ADownload ${(downloaded / (1024 * 1024)).toFixed(0)} Mb...                                `);
        });
    })
);

console.log(`Install sciter.js SDK ${sciterSDK}...`);

const platform = (os.platform() === "win32") ? "win32" : "linux";

//console.debug(platform);

// execute commands synchronously
for (const command of commands[platform]) {
    console.log(command);

    await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }

            if (stdout)
                console.log(stdout);

            if (stderr)
                console.error(stderr);

            resolve(stdout);
        });
    });
}
