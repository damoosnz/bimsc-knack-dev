export function getTableFields(view) {

    const fields = view.fields
    const objects = Knack.objects.models

    const $tableHead = $(`#${view.key} thead`)
    const $tableHeadTr = $(`#${view.key} thead tr`)
    const $fieldsTr = $('<tr></tr>')

    $tableHeadTr.find('th').each(function () {
        const $th = $(this)
        const $fieldTh = extractFieldData($th, fields, objects)
        $fieldsTr.append($fieldTh)
    })

    $tableHead.before($fieldsTr)

}

function extractFieldData($th, fields, objects) {

    

    const thClasses = ($th.attr('class') || '').split(/\s+/);
    const thFieldClass = thClasses.find(className => className.includes('field'));
    const thViewLinkClass = thClasses.find(className => className.includes('Link'));

    let $fieldTh = $('<td class="bimsc-knack-dev"></td>')
    const fieldsProperties = []

    if (thFieldClass && thFieldClass.length > 0) {

        const field = fields.find(fld => fld.key === thFieldClass)

        const $key = $(`<div>key: ${field.key}</div>`)
        fieldsProperties.push($key)

        const $name = $(`<div>name: ${field.name}</div>`)
        fieldsProperties.push($name)

        const $type = $(`<div>type: ${field.type}</div>`)
        fieldsProperties.push($type)

        // const $objectKey = $(`<div>object: ${field.object_key}</div>`)
        // fieldsProperties.push($objectKey)

        const objectName = objects.find(obj => obj.attributes.key === field.object_key)
        const $objectName = $(`<div>object: ${objectName.attributes.name} (${field.object_key})</div>`)
        fieldsProperties.push($objectName)

        fieldsProperties.forEach(prop => { $fieldTh.append(prop) })

    }

    return $fieldTh

}