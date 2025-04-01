export function getViewSourceObject(view) {

    const objects = Knack.objects.models

    // console.log('view object', objects.find(item => item.attributes.key === view.source.object))

    try {
        const viewSourceObject = {
            key: view.source.object,
            name: objects.find(item => item.attributes.key === view.source.object).attributes.name
        }
        return $(`<div class="fas-dev">displays: ${viewSourceObject.key} ${viewSourceObject.name}</b></div>`)
    } catch (err) { 
        // console.log('this viwew is not based on a an object')
    }

}