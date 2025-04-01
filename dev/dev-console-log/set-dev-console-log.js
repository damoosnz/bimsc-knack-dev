export function setDevConsoleLog(showDevConsInfo) {

var consolelogDev = console.log

if (showDevConsInfo === 'false') {
    consolelogDev = function () { };
}

return consolelogDev

}

