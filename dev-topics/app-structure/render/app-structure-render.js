import { getViews } from "../functions/get-view.js"
import { getFields } from "../functions/get-fields.js"

import { createLinkToBuilderField, createLinkToBuilderObject, createLinkToBuilderScene, createLinkToBuilderView } from "../../view-data/functions/create-links-to-builder.js"

// 1 get the list of knack scenes
const scenes = Knack.scenes.models

// 2 get the list of the views
const views = getViews(scenes)

// 3 get a list of the knack objects
const objects = Knack.objects.models

// 3 get a list of the knack fields
const fields = getFields(objects)

export function searchScenes(searchValue) {

    // searchValue is the text from the input box
    if (!searchValue) return 'Please enter a search term.';

    // Example: filter scenes by name or key
    const result = scenes.find(scene =>
        scene.attributes.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        scene.attributes.key?.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (!result) return $('<div>No scenes found.</div>');

    return createLinkToBuilderScene(result)

}

export function searchViews(searchValue) {
    if (!searchValue) return 'Please enter a search term.';

    // Filter views by name or key
    const result = views.find(view =>
        view.attributes.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        view.attributes.key?.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (!result) return $('<div>No views found.</div>');

    // Optionally, create a link or return the name/key
    return createLinkToBuilderView(result.attributes)
}

export function searchObjects(searchValue) {
    if (!searchValue) return 'Please enter a search term.';

    // Filter objects by name or key
    const result = objects.find(obj =>
        obj.attributes.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        obj.attributes.key?.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (!result) return $('<div>No objects found.</div>');

    // Display object name and key
    console.log(result)
    return createLinkToBuilderObject(result.attributes)
}

export function searchFields(searchValue) {
    if (!searchValue) return 'Please enter a search term.';

    // Filter fields by name or key
    const result = fields.find(field =>
        field.attributes.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        field.attributes.key?.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (!result) return $('<div>No fields found.</div>');

    // Display field name and key
    return createLinkToBuilderField(result.attributes.object_key, result.attributes.key)
}