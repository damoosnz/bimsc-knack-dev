export function get$ViewKey(view) {

    try {
        return $(`<div class="bimsc-knack-dev"><b>${view.scene.key} ${view.key} (${view.scene.slug}) view type: ${view.type}</b></div>`)
    } catch (err) {
        return $(`<div class="bimsc-knack-dev"><b>${view.key}</b></div>`)
    }


}