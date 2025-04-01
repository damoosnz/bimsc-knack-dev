import { initDevOptions } from "./dev-options/init-dev-options.js";

import { setDevConsoleLog } from "./dev-console-log/set-dev-console-log.js";

import { createDevContainer } from "./dev-ui/dev-container.js";
import { get$ViewKey } from "./view-data/show-view-key.js";
import { getViewSourceObject } from "./view-data/show-view-source-object.js";
import { get$ViewPath } from "./view-data/show-view-path.js";
import { listJsFiles } from "./list-js-files/render/list-js-files.js";
import { devFilterScriptRessources } from "./list-js-files/functions/get-js-files.js";

import { getTableFields } from "./fields-data/get-table-fields.js";
import { getFormFields } from "./fields-data/get-form-fields.js";
import { getDetailsFields } from "./fields-data/get-details-fields.js";
import { getListFields } from "./fields-data/get-list-fields.js";



// add view and scene keys

const knackDevMode = localStorage.getItem('knackDevMode');
const knackDevOptions = JSON.parse(localStorage.getItem('knackDevOptions')) || initDevOptions();


// set the dev console.log() function
const consolelogDev = setDevConsoleLog(knackDevOptions.console.showDevLogs)

// for all views implement functionalities based on option choices

$(document).on('knack-view-render.any', async function (event, view, data) {

    console.log(`${view.key} dev config`, view)

    // create the dev div container to receive dev info
    const $devContainer = createDevContainer(view)

    // 1 show the view, scene info
    if (knackDevOptions.viewData.showKey) {
        $devContainer.append(get$ViewKey(view))
    }

    // 2 show the path to the view
    if (knackDevOptions.viewData.showPath) {
        $devContainer.append(get$ViewPath(view))
    }

    // 3 show the surce object used by this view
    if (knackDevOptions.viewData.showSource) {
        $devContainer.append(getViewSourceObject(view))
    }

    // 4 show the js resources using this view
    if (knackDevOptions.viewData.showScripts) {
        const jsFiles = devFilterScriptRessources()
        $devContainer.append(await listJsFiles(view, jsFiles))
    }

    // console.log('new $DevContainer', $devContainer.html())
    $('#' + view.key).prepend($devContainer)

})

// form, menu, search, list, calendar, search, or details

if (knackDevOptions.fieldsData.showFields) {
    $(document).on('knack-view-render.table', async function (event, view, data) {
        getTableFields(view)
    })

    $(document).on('knack-view-render.calendar', async function (event, view, data) {
    })

    $(document).on('knack-view-render.list', async function (event, view, data) {
        getListFields(view)
    })

    $(document).on('knack-view-render.form', async function (event, view, data) {
        getFormFields(view)
    })

    $(document).on('knack-view-render.details', async function (event, view, data) {
        getDetailsFields(view)
    })
}
