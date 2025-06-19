import { createLinkToBuilderObject } from "../functions/create-links-to-builder.js"

export function get$viewSource(view) {

    const key = view.key
    const knackView = Knack.views[key].model.view

    const objects = Knack.objects.models

    // console.log('view object', objects.find(item => item.attributes.key === view.source.object))

    try {
        const viewSourceObject = {
            key: knackView.source.object,
            name: objects.find(item => item.attributes.key === knackView.source.object).attributes.name
        }

        const $viewSource = $('<div class="bimsc-knack-dev-line-item source"></div>')
        $viewSource.append($('<div>').addClass('bimsc-knack-dev').html('<b>SOURCE</b>'))
        $viewSource.append(`<div class="bimsc-knack-dev">displays: ${viewSourceObject.key} ${viewSourceObject.name}</b></div>`)
        $viewSource.append(createLinkToBuilderObject(viewSourceObject))
        return $viewSource

    } catch (err) {
        // console.log('this view is not based on a an object')
    }

}