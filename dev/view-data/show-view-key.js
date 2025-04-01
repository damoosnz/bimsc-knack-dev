export function get$ViewKey(view) {

    return $(`<div class="fas-dev"><b>${view.scene.key} ${view.key} (${view.scene.slug})</b></div>`)

}