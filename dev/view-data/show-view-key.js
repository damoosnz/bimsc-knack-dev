export function get$ViewKey(view) {

    const key = view.key
    const knackView = Knack.views[key].model.view

    try {
        return $(`<div class="bimsc-knack-dev"><b>${knackView.scene.key} ${knackView.key} (${knackView.scene.slug}) view type: ${knackView.type}</b></div>`)
    } catch (err) {
        return $(`<div class="bimsc-knack-dev"><b>${knackView.key}</b></div>`)
    }


}