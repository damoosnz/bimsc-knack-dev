import { initDevOptions } from "./dev-options/init-dev-options.js";
import { createDevOptionsInput } from "./dev-ui/create-dev-options-input.js";
import { createDevReloadButton } from "./dev-ui/create-dev-reload-button.js";

// define the section to insert the dev option bar after
const $knackInfoBar = $(".kn-info-bar");

// structure and init the local storage object

let devMode = true
let devOptions = initDevOptions()

// Retrieve values from localStorage
devMode = localStorage.getItem("knackDevMode") === "true" ? true : false
devOptions = JSON.parse(localStorage.getItem("knackDevOptions")) || devOptions
// console.log('devOptions', devOptions)


addDevBar();

function addDevBar() {

    // Create the dev bar container
    const $devContainer = $(`<div class="bimsc-knack-dev-container"></div>`);
    const $devUi = $(`<div class="bimsc-knack-dev-ui"></div>`);
    const $devUiTable = $(`
        <table>
            <tr>
                <td>Dev Mode</td>
                <td>Console Logs</td>
                <td>View Data</td>
                <td>Field</td>
            </tr>
            <tr>
                <td id="devMode"></td>
                <td id="showLogs"></td>
                <td id="viewData"></td>
                <td id="showFields"></td>
            </tr>
        </table>`)

    // Create input groups

    const devOptionsInput = [
        { label: 'Dev Mode', name: 'devMode', value: devMode, $id: 'devMode' },
        { label: 'Log Dev Mode', name: 'showDevLogs', value: devOptions.console.showDevLogs, $id: 'showLogs' },
        { label: 'Show View key', name: 'showViewKey', value: devOptions.viewData.showKey, $id: 'viewData' },
        { label: 'Show View Path', name: 'showViewPath', value: devOptions.viewData.showPath, $id: 'viewData' },
        { label: 'Show View Source', name: 'showViewSource', value: devOptions.viewData.showSource, $id: 'viewData' },
        { label: 'Show View Scripts', name: 'showViewScripts', value: devOptions.viewData.showScripts, $id: 'viewData' },
        { label: 'Show Fields Data', name: 'showFieldsData', value: devMode, $id: 'showFields' },
        // {label:'',name:''},
    ]

    devOptionsInput.forEach(option => {
        const $optionInput = createDevOptionsInput(option.label, option.name);
        $optionInput.find('input').prop("checked", option.value);
        $devUiTable.find(`#${option.$id}`).append($optionInput)
    })

    const $reloadButton = createDevReloadButton();

    // Append elements
    $devUi.append($devUiTable, $reloadButton);
    $devContainer.append($devUi);
    $devContainer.insertAfter($knackInfoBar); // Append UI to DOM

}

