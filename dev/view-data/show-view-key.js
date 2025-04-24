export function get$ViewKey(view) {

    return $(`<div class="bimsc-knack-dev"><b>${view.scene.key} ${view.key} (${view.scene.slug})</b></div>`)

}