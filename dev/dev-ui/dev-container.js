export function createDevContainer(view) {

const $extgDevContainer = $(`#fas-dev-container-${view.key}`)
if ($extgDevContainer) {
    $extgDevContainer.remove()
}

return $(`<div id="fas-dev-container-${view.key}" class="fas-dev-container"></div>`)
    
}