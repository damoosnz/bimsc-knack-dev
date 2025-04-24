export function get$ViewPath(view) {

    // console.log('get view path started')

    const allScenes = Knack.scenes.models
    // console.log('allScenes from Path', allScenes)

    // loop through the scene to extract the path
    let parentScene = allScenes.find(scene => scene.attributes.slug === view.scene.slug)
    // console.log('parentScene',parentScene)

    let separator = ' -> '

    let path = `<b>${view.name}</b>`

    while (parentScene) {

        path = parentScene.attributes.slug + separator + path
        parentScene = allScenes.find(scene => scene.attributes.slug === parentScene.attributes.parent)

    }

    return $(`<div class="bimsc-knack-dev">${path}</div>`)

}