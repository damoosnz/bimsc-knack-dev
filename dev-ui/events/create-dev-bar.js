
import { configDev } from "../../dev-init/config-dev.js";
import { initDev } from "../../dev-init/init-dev.js";

import { renderDevInputs, renderDevModeInput } from "../functions/create-dev-inputs.js";
import { createDevReloadButton } from "../functions/create-dev-reload-button.js";
import { createDevUiTable } from "../functions/create-dev-table-ui.js";

export function addDevBar() {

    let dev = initDev()
    dev = configDev(dev)

    // define the section to insert the dev option bar after
    const $knackInfoBar = $(".kn-info-bar");

    // Create the dev bar container
    const $devContainer = $(`<div class="bimsc-knack-dev-container top-header"></div>`);
    const $devHeader = $(`<div class="bimsc-knack-dev-header">DEV</div>`)
    const $devUi = $(`<div class="bimsc-knack-dev-ui"></div>`);
    let $devUiTable = createDevUiTable()

    // redner the master devMode input
    $devUiTable = renderDevModeInput($devUiTable)

    // render the dev inputs in the table
    $devUiTable = renderDevInputs(dev, $devUiTable)

    // render the reload button
    const $reloadButton = createDevReloadButton()

    // Append elements
    $devUi.append($devUiTable, $reloadButton);
    $devContainer.append($devHeader, $devUi);
    $devContainer.insertAfter($knackInfoBar); // Append UI to DOM

}