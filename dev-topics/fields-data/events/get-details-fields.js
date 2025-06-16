import { getKnackConst } from "../../knack-const/get-Knack-const.js";

export function get$DetailsFields(view) {

    const { objects, fields } = getKnackConst();

    const $fields = $(`#${view.key} [class*="field"]`);
    $fields.each(function () {
        const $fld = $(this)
        const $fieldData = extractFieldData($fld, fields, objects)
        $fld.before($fieldData)
    })

}


function extractFieldData($fld, fields, objects) {

    const fieldInputData = $fld.attr('class');
    const field = fields.find(el => el.attributes.key === fieldInputData)

    let $fieldData = $('<div class="bimsc-knack-dev fields-data"></div>')
    const fieldsProperties = []

    if (field) {

        const $key = $(`<div>key: ${field.attributes.key}</div>`)
        fieldsProperties.push($key)

        const $name = $(`<div>name: ${field.attributes.name}</div>`)
        fieldsProperties.push($name)

        const $type = $(`<div>type: ${field.attributes.type}</div>`)
        fieldsProperties.push($type)

        // const $objectKey = $(`<div>object: ${field.object_key}</div>`)
        // fieldsProperties.push($objectKey)

        const objectName = objects.find(obj => obj.attributes.key === field.attributes.object_key) // 
        const $objectName = $(`<div>object: ${objectName.attributes.name} (${field.attributes.object_key})</div>`)
        fieldsProperties.push($objectName)

        fieldsProperties.forEach(prop => { $fieldData.append(prop) })

    }

    return $fieldData
}

