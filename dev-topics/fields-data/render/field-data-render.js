import { get$TableFields } from "../functions/get-table-fields.js"
import { get$DetailsFields } from "../functions/get-details-fields.js"
import { get$FormFields } from "../functions/get-form-fields.js"
import { get$ListFields } from "../functions/get-list-fields.js"


export function showFields() {

    $(document).on('knack-view-render.table', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData : get$TableFields
        })
    })

    $(document).on('knack-view-render.list', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData : get$ListFields
        })
        
    })

    $(document).on('knack-view-render.form', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData : get$FormFields
        })
        
    })

    $(document).on('knack-view-render.details', async function (event, view, data) {
        showFieldsData({
            selector: '.bimsc-knack-dev.fields-data',
            getData : get$DetailsFields
        })
        
    })
    
}

function showFieldsData({ selector, getData }) {
    $(document).one('knack-view-render.any', function (event, view, data) {
        const $data = getData(view);
        $devCont.find(selector).remove();
        $devCont.append($data);
    });
}

