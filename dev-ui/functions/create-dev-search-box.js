export function createDevSearchBox(label, eventHandler) {
    // Create container
    const $container = $('<div class="dev-search-box" style="display:flex;align-items:center;gap:8px;"></div>');

    // Create label
    const $label = $(`<label style="margin-right:4px;">${label}</label>`);

    // Create input
    const $input = $('<input type="text" class="dev-search-input" style="margin-right:4px; max-width:100px">');

    // Create button
    const $button = $('<button type="button" class="dev-search-btn">Search</button>');

    // Create result div
    const $result = $('<div class="dev-search-result" style="margin-left:8px;"></div>');

    // Button click handler
    $button.on('click', async function () {
        const value = $input.val();
        // Call the event handler, allow for async or sync
        let result;
        try {
            result = await eventHandler(value);
        } catch (e) {
            result = `Error: ${e.message}`;
        }
        $result.empty().append(result)
    });

    // Assemble
    $container.append($label, $input, $button, $result);

    return $container;
}