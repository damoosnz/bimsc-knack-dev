export function getViewSourceObject(view) {

    const key = view.key
    const knackView = Knack.views[key].model.view

    const objects = Knack.objects.models

    // console.log('view object', objects.find(item => item.attributes.key === view.source.object))

    try {
        const viewSourceObject = {
            key: knackView.source.object,
            name: objects.find(item => item.attributes.key === knackView.source.object).attributes.name
        }
        return $(`<div class="bimsc-knack-dev">displays: ${viewSourceObject.key} ${viewSourceObject.name}</b></div>`)
    } catch (err) {
        // console.log('this view is not based on a an object')
    }

}