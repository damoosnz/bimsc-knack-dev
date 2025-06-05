export function getListFields(view) {

    const fields = view.fields
    const objects = Knack.objects.models

    const $firstCard = $(`#${view.key} .kn-list-item-container`).first();
    const $fields = $firstCard.find('[class*="field"]')

    $fields.each(function () {
        const $fld = $(this)
        const $fieldData = extractFieldData($fld, fields, objects)
        $fld.before($fieldData)
    })

}

function extractFieldData($fld, fields, objects) {

    let fieldClasses = ($fld.attr("class") || '').split(/\s+/)
    let fieldClass = fieldClasses.find(className => className.includes('field'))

    let $fieldData = $('<td class="bimsc-knack-dev"></td>')
    const fieldsProperties = []

    if (fieldClass && fieldClass.length > 0) {

        try {
            const field = fields.find(fld => fld.key === fieldClass)

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

            fieldsProperties.forEach(prop => { $fieldData.append(prop) })
        } catch (err) {

        }

    }

    return $fieldData

}