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

function showDevData({ selector, getData }) {
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



