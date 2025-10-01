import { renderOptions } from "../../dev-topics/view-data/render/view-data-render.js";
import { renderFields } from "../../dev-topics/fields-data/render/field-data-render.js";
import { createDevContainer } from "../functions/create-dev-container.js";

const options = [
    'key',
    'path',
    'source',
    'fields',
    'script',
];

$(document).on('knack-view-render.any', async function (event, view, data) {

    const $view = $(`#${view.key}`);
    const $devContainer = createDevContainer(view).prependTo($view);
    const $options = $(`<div class="bimsc-knack-dev-line-item options"></div>`)
        .appendTo($devContainer);

    // define toggleEvent BEFORE loop
    const toggleEvent = ($inp, $res) => {
        const val = $inp.prop('checked');
        val ? $res.show() : $res.hide();
    };

    const renderOption = async (o, view) => {
        return await renderOptions[o](view)
    }

    const renderField = async (view) => {
        return await renderFields[view.type](view)
    }

    for (const o of options) {

        let $optRes

        if (o !== 'fields') {
            $optRes = $(`<div class="bimsc-knack-dev-line-item ${o}"></div>`)
                .appendTo($devContainer)
                .hide()
                .append(await renderOption(o, view))
        }

        if (o === 'fields') {
            if (!['table', 'list', 'form', 'details'].includes(view.type)) continue
            $optRes = await renderField(view)
            $optRes.hide()                
        }

        const $optInput = $(`<div><input type="checkbox" name="${o}"> ${o}</div>`)
            .appendTo($options);
        // bind properly
        $optInput.find('input').on('change', function () {
            toggleEvent($optInput.find('input'), $optRes);
        });

    }
});
