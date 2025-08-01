export function createLinkToBuilderView(view) {


    const url = `${getBaseUrl()}/pages/${view.scene.key}/views/${view.key}/${view.type}`
    return $(`<a class="bimsc-knack-dev-button" href="${url}" target="_blank">${view.key}</a>`);

}

export function createLinkToBuilderSceneFromView(view) {

    const url = `${getBaseUrl()}/pages/${view.scene.key}`
    return $(`<a class="bimsc-knack-dev-button" href="${url}" target="_blank">${view.scene.key}</a>`);

}

export function createLinkToBuilderScene(scene) {

    const url = `${getBaseUrl()}/pages/${scene.attributes.key}`
    return $(`<a class="bimsc-knack-dev-button" href="${url}" target="_blank">${scene.attributes.key}</a>`);

}

export function createLinkToBuilderObject(object) {

    const url = `${getBaseUrl()}/schema/list/objects/${object.key}/fields`
    return $(`<a class="bimsc-knack-dev-button" href="${url}" target="_blank">${object.key}</a>`);

}

export function createLinkToBuilderField(objectKey, fieldKey) {

    const url = `${getBaseUrl()}/schema/list/objects/${objectKey}/fields/${fieldKey}/settings`
    return $(`<a class="bimsc-knack-dev-button" href="${url}" target="_blank">${fieldKey}</a>`);


}

function getBaseUrl() {

    const appSlug = Knack.app.attributes.slug // "bimsc-finance"
    const accountSlug = Knack.account.slug

    return `https://builder.knack.com/${accountSlug}/${appSlug}`


}