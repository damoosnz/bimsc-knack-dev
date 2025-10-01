import { createDevContainer } from "../../../dev-ui/functions/create-dev-container.js";
import { get$ViewKey } from "../events/show-view-key.js";
import { get$ViewPath } from "../events/show-view-path.js";
import { get$viewSource } from "../events/show-view-source.js";
import { get$viewScripts } from "../events/show-view-scripts.js";

export function showKey() {
    showDevData({
        selector: '.key',
        getData: get$ViewKey
    });
}

export function showPath() {
    showDevData({
        selector: '.path',
        getData: get$ViewPath
    });
}

export function showSource() {
    showDevData({
        selector: '.source',
        getData: get$viewSource
    });
}

export function showScripts() {
    showDevData({
        selector: '.script',
        getData: get$viewScripts
    });

}

export const renderOptions = {
    script: get$viewScripts,
    source: get$viewSource,
    path: get$ViewPath,
    key: get$ViewKey
}



function showDevData1({ selector, getData }) {
    $(document).on('knack-view-render.any', async function (event, view, data) {

        const $placeHolder = $(`#${view.key}`);

        try {
            const dataResult = await getData(view); // support both sync and async
            const $devCont = createDevContainer(view);
            $devCont.find(selector).remove();
            $devCont.append(dataResult);
            $placeHolder.prepend($devCont);
        } catch (err) {
            // console.warn(`Error getting ${selector} data for view ${view.key}:`, err);
        }
    });
}

async function showDevData({ selector, getData }) {

    // hash_scenes

    const scenesHash = Knack.hash_scenes
    console.log({ scenesHash })
    const lastHash = scenesHash[scenesHash.length - 1]
    console.log({ lastHash })
    const curSceneSlug = lastHash.slug
    console.log({ curSceneSlug })
    const curScene = Knack.scenes.models.find(s => s.attributes.slug === curSceneSlug)
    const views = curScene.attributes.views

    for (const view of views) {

        const $placeHolder = $(`#${view.key}`);

        try {
            const dataResult = await getData(view); // support both sync and async
            const $devCont = createDevContainer(view);
            $devCont.find(selector).remove();
            $devCont.append(dataResult);
            $placeHolder.prepend($devCont);
        } catch (err) {
            // console.warn(`Error getting ${selector} data for view ${view.key}:`, err);
        }

    }

}









