export function createDevReloadButton() {

    const $btn = $(`<button id="reloadBtn">Reload</button>`);

    $btn.on("click", function () {
        // Update localStorage with selected values
        const userDevMode = $(`input[name="devMode"]:checked`).prop("checked")
        const userDevOptions = {
            console: {
                showDevLogs: $(`input[name="showDevLogs"]:checked`).prop("checked")
            },
            viewData: {
                showKey: $(`input[name="showViewKey"]:checked`).prop("checked"),
                showPath: $(`input[name="showViewPath"]:checked`).prop("checked"),
                showSource: $(`input[name="showViewSource"]:checked`).prop("checked"),
                showScripts: $(`input[name="showViewScripts"]:checked`).prop("checked")
            },
            fieldsData: {
                showFields: $(`input[name="showFieldsData"]:checked`).prop("checked")
            }
        }
        // console.log('userDevMode', userDevMode)
        // console.log('userDevOptions', userDevOptions)
        localStorage.setItem("knackDevMode", userDevMode);
        localStorage.setItem("knackDevOptions", JSON.stringify(userDevOptions));

        // Reload the page
        location.reload();
    });

    return $btn;

}