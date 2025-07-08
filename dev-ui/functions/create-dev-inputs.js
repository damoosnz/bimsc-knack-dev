import { saveDev } from "../../dev-init/save-dev.js";
import { createDevCheckBox } from "./create-dev-check-box.js";
import { createDevSearchBox } from "./create-dev-search-box.js";

export function renderDevInputs(dev, $devUiTable) {

    // first level of dev -- section
    for (const l1Key in dev) {
        const section = dev[l1Key];
        // console.log('section', section)

        // second level of dev -- settings
        for (const l2Key in section) {
            const config = section[l2Key];
            // console.log('config', config)

            // check if second level contains key input
            if (config && typeof config === 'object' && 'input' in config && 'handler' in config) {


                const curInput = config.input;
                // console.log('input', input)

                // Create input based on type

                let $input

                if (curInput.type === 'checkBox') {

                    // create the input
                    $input = createDevCheckBox(curInput.label, l2Key, config.on)

                    // Capture keys per iteration with closure
                    // function eventwraper(l1, l2) {
                    $input.find(`input[name="${l2Key}"]`).on('change', function () {
                        const newVal = $(this).is(':checked');
                        dev[l1Key][l2Key].on = newVal;
                        saveDev(dev)
                    });
                    // }

                    // eventwraper(l1Key, l2Key);

                    // append the input to the table
                    $devUiTable.find(`#${l1Key}`).append($input)

                }

                if (curInput.type === 'search') {
                    $input = createDevSearchBox(curInput.label, config.handler)
                    $devUiTable.find(`#${l1Key}`).append($input)
                }


            }
        }
    }

    return $devUiTable
}

export function renderDevModeInput($devUiTable) {

    // Create checkbox for exiting dev mode
    const $devMode = createDevCheckBox('dev mode Y/N', 'devMode', true);

    // Append to your container
    $devUiTable.find('#devMode').append($devMode)

    // Track the value
    let devMode = true; // initial value

    // Attach change listener to update localStorage directly
    $devMode.find('input[type="checkbox"]').on('change', function () {
        const isChecked = $(this).is(':checked');
        localStorage.setItem('knackDevMode', JSON.stringify(isChecked));
    });

    return $devUiTable


}


