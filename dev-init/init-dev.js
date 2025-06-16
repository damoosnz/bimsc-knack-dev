
import { setDevConsLog } from '../dev-topics/console-log/set-dev-console-log.js'

import { showKey, showPath, showSource, showScripts } from "../dev-topics/view-data/render/view-data-render.js";
import { showFields } from "../dev-topics/fields-data/render/field-data-render.js";

import { searchScenes, searchViews, searchObjects, searchFields } from "../dev-topics/app-structure/render/app-structure-render.js";

export function initDev() {

    const dev = {
        console: {
            devLogs: {
                on: false,
                handler: setDevConsLog,
                input: {type: 'checkBox', label: 'console dev logs'}
            }
        },
        viewData: {
            key: {
                on: false,
                handler: showKey,
                input: {type: 'checkBox', label: 'show scene & view keys'}
            },
            path: { 
                on: false,
                handler: showPath,
                input: {type: 'checkBox', label: 'show scene path'}
            },
            source: {
                on: false,
                handler: showSource,
                input: {type: 'checkBox', label: 'show view source object'}
            },
            scripts: {
                on: false,
                handler: showScripts,
                input: {type: 'checkBox', label: 'show scripts for view'}
            }
        },
        fieldsData: {
            fields: {
                on: false,
                handler: showFields,
                input: {type: 'checkBox', label: 'show fields info'}
            },
        },
        searchApp: {
            scene: {
                on: true,
                handler: searchScenes,
                input: {type: 'search', label: 'search scenes',}
            },
            view: {
                on: true,
                handler: searchViews,
                input: {type: 'search', label: 'search views'}
            },
            objects: {
                on: true,
                handler: searchObjects,
                input: {type: 'search', label: 'search objects'}
            },
            fields: {
                on: true,
                handler: searchFields,
                input: {type: 'search', label: 'search fields'}
            },
        }
    };

    return dev

}





