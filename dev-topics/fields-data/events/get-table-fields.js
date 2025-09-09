import { createLinkToBuilderField } from "../../view-data/functions/create-links-to-builder.js"

export async function get$TableFields(view) {

    const totals = view.totals

    if (totals || totals.length > 0) {
        await sleep(2000)
    }

    const fields = view.fields
    const objects = Knack.objects.models

    const $tableHead = $(`#${view.key} thead`)
    const $tableHeadTr = $(`#${view.key} thead tr`)

    // wait for the totals to render


    // const $fieldsTr = $('<tr class="bimsc-knack-dev fields-data"></tr>')

    $tableHeadTr.find('th').each(function () {

        const $th = $(this)
        // const $fieldTh = extractFieldData($th, fields, objects)
        const $fieldCont = extractFieldData($th, fields, objects)
        // $fieldsTr.append($fieldTh)
        $th.append($fieldCont)
    })

    // $tableHead.before($fieldsTr)

}

function extractFieldData($th, fields, objects) {

    const thClasses = ($th.attr('class') || '').split(/\s+/);
    const thFieldClass = thClasses.find(className => className.includes('field'));
    const thViewLinkClass = thClasses.find(className => className.includes('Link'));

    // let $fieldTh = $('<td class="bimsc-knack-dev"></td>')
    const $fieldCont = $('<div class="bimsc-knack-dev fields-data"></div>')
    const fieldsProperties = []

    if (thFieldClass && thFieldClass.length > 0) {

        const field = fields.find(fld => fld.key === thFieldClass)

        const $key = $(`<div class="field-prop"><b>key:</b> ${field.key}</div>`)
        fieldsProperties.push($key)

        const $name = $(`<div class="field-prop"><b>name:</b> ${field.name}</div>`)
        fieldsProperties.push($name)

        const $type = $(`<div class="field-prop"><b>type:</b> ${field.type}</div>`)
        fieldsProperties.push($type)

        const objectName = objects.find(obj => obj.attributes.key === field.object_key)
        const $objectName = $(`<div class="field-prop"><b>object:</b> ${objectName.attributes.name} (${field.object_key})</div>`)
        fieldsProperties.push($objectName)

        const $link = createLinkToBuilderField(field.object_key, field.key)
        fieldsProperties.push($link)

        // fieldsProperties.forEach(prop => { $fieldTh.append(prop) })
        fieldsProperties.forEach(prop => { $fieldCont.append(prop) })

    }

    // return $fieldTh
    return $fieldCont

}

// Utility sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}