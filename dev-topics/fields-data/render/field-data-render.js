import { get$TableFields } from "../events/get-table-fields.js"
import { get$DetailsFields } from "../events/get-details-fields.js"
import { get$FormFields } from "../events/get-form-fields.js"
import { get$ListFields } from "../events/get-list-fields.js"

export function showFields() {

    $(document).on('knack-view-render.table', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData: get$TableFields,
            view
        })
    })

    $(document).on('knack-view-render.list', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData: get$ListFields,
            view
        })

    })

    $(document).on('knack-view-render.form', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData: get$FormFields,
            view
        })

    })

    $(document).on('knack-view-render.details', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData: get$DetailsFields,
            view
        })

    })

}

async function showFieldsData({ selector, getData, view }) {
        
        const $placeHolder = $(`#${view.key}`);

        try {
            const dataResult = await getData(view); // support both sync and async
            const $devCont = createDevContainer(view);
            $devCont.find(selector).remove();
            $devCont.append(dataResult);
            $placeHolder.prepend($devCont);
        } catch (err) {
            // console.warn(`Error getting ${selector} data for view ${view.key}:`, err);
        }

}

