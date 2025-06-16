export function get$ViewKey(view) {

    const key = view.key
    const knackView = Knack.views[key].model.view

    try {
        return $(`<div class="bimsc-knack-dev key"><b>${knackView.scene.key} ${knackView.key} (${knackView.scene.slug}) view type: ${knackView.type}</b></div>`)
    } catch (err) {
        return $(`<div class="bimsc-knack-dev key"><b>${knackView.key}</b></div>`)
    }


}

// scene link https://builder.knack.com/damoos/findaservice-31/pages/scene_1703
// view link https://builder.knack.com/damoos/findaservice-31/pages/scene_1703/views/view_4314/table