export function createDevContainer(view) {

    const $extgDevContainer = $(`#bimsc-knack-dev-container-${view.key}`)

    if ($extgDevContainer.length > 0) {
        // $extgDevContainer.remove()
        return $extgDevContainer
    }

    return $(`<div id="bimsc-knack-dev-container-${view.key}" class="bimsc-knack-dev-container">DEV</div>`)

}