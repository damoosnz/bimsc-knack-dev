// add view and scene keys

const knackDevMode = localStorage.getItem('knackDevMode');
const showDevEnvInfo = localStorage.getItem('showDevEnvInfo');
const showDevConsInfo = localStorage.getItem('showDevConsInfo');

if (knackDevMode === 'true') {

    var consolelogDev = console.log

    if (showDevConsInfo === 'false') {
        consolelogDev = function () { };
    }

    if (showDevEnvInfo === 'true') {

        const objects = Knack.objects.models
        const scenes = Knack.scenes
        const jsFiles = devFilterScriptRessources()


        $(document).on('knack-view-render.any', async function (event, view, data) {

            // define the fas-dev-container

            var devContainer = `<div id="fas-dev-container-${view.key}" class="fas-dev-container"></div>`
            $('#' + view.key).prepend(devContainer)
            var $devContainer = $(`#fas-dev-container-${view.key}`)

            consolelogDev('view ' + view.key, view, 'records ' + view.key, data)

            // display the view scene and slug
            devShowViewKeySceneKey(view, $devContainer)

            // display the path as in knack builder
            devShowViewPath(view, $devContainer)

            // display the view source
            devShowViewSource(view, $devContainer)

            // get the list of fields type and name for tables

            if (view.type === 'table') {
                devShowFieldsNameTable(view)
            }

            // get the list of fields type and name for details

            if (view.type === 'details') {
                devShowFieldsNameDetails(view)
            }

            // get the list of fields type and name for details

            if (view.type === 'form') {
                devShowFieldsNameForms(view)
            }

            // list the js resources associated to the view
            devShowJsRessources(view, $devContainer)

        });

        function devShowViewKeySceneKey(view, $devContainer) {

            $devContainer.append(`<div class="fas-dev"><b>${view.scene.key} ${view.key} (${view.scene.slug})</b></div>`)

        }

        function devShowViewPath(view, $devContainer) {
            const viewName = view.title
            const sceneName = view.scene.name
            var path = sceneName + ' > ' + viewName
            var parentScene = view.scene.parent
            if (parentScene) {
                // let counter = 0
                while (parentScene) {
                    // counter += 1
                    var result = scenes.find(item => item.id === parentScene)
                    var parentName = result.attributes.name
                    var parentScene = result.attributes.parent
                    path = parentName + ' > ' + path
                    consolelogDev(parentScene)
                }

            }
            $devContainer.append(`<div class="fas-dev">${path}</div>`)
        }

        function devShowViewSource(view, $devContainer) {
            try {
                const viewSourceObject = {
                    key: view.source.object,
                    name: objects.find(item => item.attributes.key === view.source.object).attributes.name
                }
                $devContainer.append(`<div class="fas-dev">displays: ${viewSourceObject.key} ${viewSourceObject.name}</b></div>`)
            } catch (err) { }
        }

        function devShowFieldsNameTable(view) {

            var fields = devGetViewFieldsTable(view)
            console.log(fields)

            // add field info in the table header
            const fieldTr = $('<tr></tr>');
            $(`#${view.key} thead tr th`).each(function () {
                const thElement = $(this);
                let match = false
                fields.forEach(field => {
                    if (thElement.hasClass(field.key)) {
                        const newTh = $('<th class="fas-dev"></th>').html(`<span>${field.key}</span><br><span>${field.name}</span><br><span>${field.type}</span><br><span>in ${field.object_key} ${field.object_name} </span>`); // Add field name or any content you want
                        fieldTr.append(newTh);
                        match = true
                    } else {
                        // fieldTr.append('<th></th>');
                    }
                });
                if (!match) {
                    fieldTr.append('<th></th>');
                }
            });
            $(`#${view.key} thead tr`).before(fieldTr);
            fieldTr.find('th, td').css('padding-bottom', '10px');

            // add record id in the first td of the tr in tobody
            $(`#${view.key} tbody tr`).each(function () {
                // Get the ID of the current <tr>
                const rowId = $(this).attr('id');
                // Append the row ID to the first <td> in the current <tr>
                const firstTd = $(this).find('td').first(); // Select the first <td>
                firstTd.append(`<span style="background: black; color: white;"><br>rec id: ${rowId}</span>`); // Append the ID text
            });

            // Loop through each <td> in the row except the first one
            $(this).find('td').not(':first').each(function () {
                const tdElement = $(this);
                const fieldKey = tdElement.data('field-key'); // Get the field key
                const field = fields.find(f => f.key === fieldKey); // Find the corresponding field

                // Check if the field is a connection
                if (field && field.type === 'connection') {
                    // Get the connection ID from the <span> with the class
                    const connectionId = tdElement.find('span[class^="col-"] span').attr('class');
                    // Append the connection ID to the <td>
                    if (connectionId) {
                        tdElement.append(`<span style="background: black; color: white;">con id: ${connectionId}</span>`); // Append the connection ID
                    }
                }
            });


        }

        function devShowFieldsNameDetails(view) {

            var fields = devGetViewFieldsDetail(view)

            for (var field of fields) {
                var $fieldLabel = $(`#${view.key} div.kn-detail.${field.key}`)
                var $devFieldInfo = `<div class="fas-dev">${field.key} ${field.name} ${field.type} from object ${field.object_key} ${field.object_name}</viv>`
                $fieldLabel.append($devFieldInfo)
            }

        }

        function devShowFieldsNameForms(view) {

            var fields = devGetViewFieldsDetail(view)

            for (var field of fields) {
                var $fieldLabel = $(`#kn-input-${field.key}`) // #kn-input-field_681
                var $devFieldInfo = `<div class="fas-dev">${field.key} ${field.name} ${field.type} from object ${field.object_key} ${field.object_name}</viv>`
                $fieldLabel.prepend($devFieldInfo)
            }

        }


        async function devShowJsRessources(view, $devContainer) {
            // Array to hold results of the search
            const searchKeys = [view.key]; // [view.key, ".any", `.${view.type}`] Replace "yourSearchValue" with your actual search term
            const foundInFiles = [];

            var $scriptHtml = `<div class="fas-dev"><ul>Scripts</ul></div>`
            var $scriptitems = $devContainer.append($scriptHtml)
            var $ul = $scriptitems.find('ul');

            // Fetch and search through each JS file
            for (const jsFile of jsFiles) {
                try {
                    const response = await fetch(jsFile.name);
                    const scriptContent = await response.text();

                    // Search for each key in the script content
                    for (const searchKey of searchKeys) {
                        if (scriptContent.includes(searchKey)) {
                            foundInFiles.push({ file: jsFile.name, key: searchKey });
                            // html += `<div class="fas-dev">${searchKey} in ${jsFile.name.replace('http://localhost:8888/', '').trim()}</div>`
                            $ul.append(`<li class="fas-dev">${searchKey} in ${jsFile.name.replace('http://localhost:8888/', '').trim()}</li>`)
                            // html += `<li class="fas-dev">${searchKey} in ${jsFile.name.replace('http://localhost:8888/', '').trim()}</li>`
                            //  consolelogDev(`Found "${searchKey}" in ${jsFile.name}`);
                        }
                    }
                } catch (error) {
                    console.error(`Failed to fetch ${jsFile.name}:`, error);
                }
            }

        }

        function devGetViewFieldsTable(view) {

            var fields = view.fields // key name type
            fields = fields.map(field => ({
                key: field.key,
                name: field.name,
                type: field.type,
                object_key: field.object_key,
                object_name: objects.find(item => item.attributes.key === field.object_key).attributes.name
            }));
            consolelogDev(fields)
            return fields

        }

        function devGetViewFieldsDetail(view) {

            var model = Knack.models[view.key].attributes
            // Filter fields where the key starts with 'field_', does not end with '_raw', and does not include '.'
            var fieldsList = (Object.entries(model).filter(([key, value]) =>
                key.startsWith('field_') &&
                !key.endsWith('_raw') &&
                !key.includes('.') &&
                !key.includes('thumb')
            )).map(item => item[0]);

            var fields = []

            for (var fieldKey of fieldsList) {
                const result = objects.find(element =>
                    element.attributes.fields.find(field => field.key === fieldKey) // .attributes.fields[fieldKey]
                );
                const field = {
                    key: result.attributes.fields.find(item => item.key === fieldKey).key,
                    name: result.attributes.fields.find(item => item.key === fieldKey).name,
                    type: result.attributes.fields.find(item => item.key === fieldKey).type,
                    object_key: result.attributes.key,
                    object_name: result.attributes.name
                }

                // fields.push(result.attributes.fields.find(item => item.key === fieldKey))
                fields.push(field)
            }

            consolelogDev('fields from extracting function', view.key, fields)

            return fields

        }


    } else {

    }




} else {
    // consolelogDev('knackDevMode is not true or not set');
}

function devFilterScriptRessources() {
    const resources = performance.getEntriesByType('resource');

    // Filter for JavaScript files that are loaded from localhost
    const jsFiles = resources.filter(resource =>
        resource.initiatorType === 'script' &&
        resource.name.includes('localhost') &&
        resource.name !== 'http://localhost:8888/reusable-js/_dev/dev-config.js'
    );

    return jsFiles
}


