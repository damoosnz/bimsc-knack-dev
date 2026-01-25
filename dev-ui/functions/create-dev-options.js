
export function createDevOptions($devContainer) {

    // $(`<div class="bimsc-knack-dev-line-item options"></div>`)

    const $extgDevOptions = $devContainer.find(`.bimsc-knack-dev-line-item.options`)
    if ($extgDevOptions.length > 0) {
        // $extgDevContainer.remove()
        return $extgDevOptions
    }
    return $(`<div class="bimsc-knack-dev-line-item options"></div>`)
    
}
