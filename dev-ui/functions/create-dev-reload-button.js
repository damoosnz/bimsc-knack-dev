export function createDevReloadButton() {

    const $btn = $(`<button id="reloadBtn">Reload</button>`);

    $btn.on("click", function () {
        // Reload the page
        location.reload();
    });

    return $btn;

}