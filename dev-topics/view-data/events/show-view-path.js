export function get$ViewPath(view) {

    const key = view.key
    const knackView = Knack.views[key].model.view

    const allScenes = Knack.scenes.models
    // console.log('allScenes from Path', allScenes)

    // loop through the scene to extract the path
    let parentScene = allScenes.find(scene => scene.attributes.slug === knackView.scene.slug)
    // console.log('parentScene',parentScene)

    let separator = ' -> '

    let path = `<b>${knackView.name}</b>`

    while (parentScene) {

        path = parentScene.attributes.slug + separator + path
        parentScene = allScenes.find(scene => scene.attributes.slug === parentScene.attributes.parent)

    }

    const $viewPath = $('<div class="bimsc-knack-dev-line-item path"></div>')
    $viewPath.append($('<div>').addClass('bimsc-knack-dev').html('<b>PATH</b>'))
    $viewPath.append(`<div class="bimsc-knack-dev">${path}</div>`)

    return $viewPath

}