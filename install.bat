@echo OFF

REM sciter 4.4.8.23-bis
SET sciterSDK="e28811887e0d94a531b9eef2ac4e2b31768565d8"

IF NOT EXIST bin\win-x32 mkdir bin\win-x32

cd bin\win-x32

curl -LO https://github.com/c-smile/sciter-js-sdk/raw/%sciterSDK%/bin/windows/x32/scapp.exe
curl -LO https://github.com/c-smile/sciter-js-sdk/raw/%sciterSDK%/bin/windows/x32/inspector.exe
curl -LO https://github.com/c-smile/sciter-js-sdk/raw/%sciterSDK%/bin/windows/x32/sciter.dll

cd ..

REM sciter package manager 0.2.2
curl -LO https://github.com/8ctopus/sciter-package-manager/releases/download/0.2.2/spm.phar
