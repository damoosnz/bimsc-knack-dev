import { createLinkToBuilderScene, createLinkToBuilderView } from "../functions/create-links-to-builder.js"

export function get$ViewKey(view) {

    const key = view.key
    const knackView = Knack.views[key].model.view

    const $viewkey = $('<div class="bimsc-knack-dev-line-item key"></div>')
    $viewkey.append($('<div>').addClass('bimsc-knack-dev').html('<b>KEY</b>'))

    let $viewKeyText

    try {
        $viewKeyText = `<div class="bimsc-knack-dev"><b>${knackView.scene.key} ${knackView.key} (${knackView.scene.slug}) view type: ${knackView.type}</b></div>`
        $viewkey.append($viewKeyText)
        $viewkey.append(createLinkToBuilderScene(knackView) , createLinkToBuilderView(knackView))
    } catch (err) {
        try {
        $viewKeyText = `<div class="bimsc-knack-dev"><b>${knackView.key}</b></div>`
        $viewkey.append($viewKeyText)
        } catch (err) {}    
    }

    return $viewkey

}

// scene link https://builder.knack.com/damoos/findaservice-31/pages/scene_1703
// view link https://builder.knack.com/damoos/findaservice-31/pages/scene_1703/views/view_4314/table