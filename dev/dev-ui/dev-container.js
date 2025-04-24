export function createDevContainer(view) {

const $extgDevContainer = $(`#bimsc-knack-dev-container-${view.key}`)
if ($extgDevContainer) {
    $extgDevContainer.remove()
}

return $(`<div id="bimsc-knack-dev-container-${view.key}" class="bimsc-knack-dev-container"></div>`)
    
}