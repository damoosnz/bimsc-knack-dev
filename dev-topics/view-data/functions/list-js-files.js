export async function listJsFiles(view, jsFiles) {

    // Array to hold results of the search
    const searchKeys = [view.key]; // [view.key, ".any", `.${view.type}`]

    var $scriptItems = $(`<div class="bimsc-knack-dev"><ul>Scripts</ul></div>`)
    var $ul = $scriptItems.find('ul');

    // Fetch and search through each JS file
    for (const jsFile of jsFiles) {
        try {
            const response = await fetch(jsFile.name);
            const scriptContent = await response.text();

            // Search for each key in the script content using regular expressions
            for (const searchKey of searchKeys) {
                // Create a regex pattern that ensures an exact match for the search key
                const regex = new RegExp(`\\b${searchKey}\\b`, 'g'); // \b ensures word boundaries

                // If the search key is found as a whole word (not part of a larger word like view_1234)
                if (regex.test(scriptContent)) {
                    $ul.append(`<li class="bimsc-knack-dev">${searchKey} in ${jsFile.name.replace('http://localhost:8888/', '').trim()}</li>`)
                }
            }
        } catch (error) {
            console.error(`Failed to fetch ${jsFile.name}:`, error);
        }
    }

    return $scriptItems;
}