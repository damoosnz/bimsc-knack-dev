import { getJsFiles } from "../functions/get-js-files.js";
import { listJsFiles } from "../functions/list-js-files.js";

export async function get$viewScripts(view) {

    let jsFiles = getJsFiles()

    // Array to hold results of the search
    const searchKeys = [view.key]; // [view.key, ".any", `.${view.type}`]

    const $viewScripts = $('<div class="bimsc-knack-dev-line-item script"></div>')
    $viewScripts.append(`<div class="bimsc-knack-dev"><b>SCRIPTS</b><div>`)
    $viewScripts.append(`<ul class="bimsc-knack-dev"></ul>`)
    var $ul = $viewScripts.find('ul');

    let matched = 0
    let notMatched = 0
    let failed = 0

    // Fetch and search through each JS file
    for (const jsFile of jsFiles) {
        try {
            const response = await fetch(jsFile);
            const scriptContent = await response.text();

            // Search for each key in the script content using regular expressions
            for (const searchKey of searchKeys) {
                // Create a regex pattern that ensures an exact match for the search key
                const regex = new RegExp(`\\b${searchKey}\\b`, 'g'); // \b ensures word boundaries

                // If the search key is found as a whole word (not part of a larger word like view_1234)
                if (regex.test(scriptContent)) {
                    matched++
                    $ul.append(`<li class="bimsc-knack-dev">${searchKey} in ${jsFile.replace('http://localhost:8888/', '').trim()}</li>`)
                } else {
                    notMatched++
                }
            }
        } catch (error) {
            failed++
            // console.error(`Failed to fetch ${jsFile.name}:`, error);
        }
    }

    // console.log(`js files search for ${view.key}`, { total: jsFiles.length, matched, notMatched, failed })

    if (matched > 0) {
        return $viewScripts
    }

    ;
}