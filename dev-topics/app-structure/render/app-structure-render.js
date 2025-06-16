
import { getViews } from "../functions/get-view.js"
import { getFields } from "../functions/get-fields.js"

// 1 get the list of knack scenes
const scenes = Knack.scenes.models

// 2 get the list of the views
const views = getViews(scenes)

// 3 get a list of the knack objects
const objects = Knack.objects.models

// 3 get a list of the knack fields
const fields = getFields(objects)

export function searchScenes() {
    
}

export function searchViews() {

}

export function searchObjects() {

}

export function searchFields() {

}