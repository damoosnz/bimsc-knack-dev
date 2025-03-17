const $knackNavBar = $(".kn-info-bar");

// Retrieve values from localStorage
const knackLs = {
    devMode: localStorage.getItem("knackDevMode") || "no",
    showDevMode: localStorage.getItem("showDevEnvInfo") || "no",
    consDevMode: localStorage.getItem("showDevConsInfo") || "no"
};

console.log("knackLs", knackLs);

addDevBar();

function addDevBar() {
    // Function to create labeled radio inputs
    const createInput = (label, name) => {
        return $(`
            <div>
                <label>${label}:</label>
                <input type="radio" name="${name}" value="yes"> Yes
                <input type="radio" name="${name}" value="no"> No
            </div>
        `);
    };

    // Function to create the reload button
    const createButton = () => {
        const $btn = $(`<button id="reloadBtn">Reload</button>`);

        $btn.on("click", function () {
            // Update localStorage with selected values
            localStorage.setItem("knackDevMode", $(`input[name="devMode"]:checked`).val());
            localStorage.setItem("showDevEnvInfo", $(`input[name="showDevMode"]:checked`).val());
            localStorage.setItem("showDevConsInfo", $(`input[name="logDevMode"]:checked`).val());

            // Reload the page
            location.reload();
        });

        return $btn;
    };

    // Create the dev bar container
    const $devContainer = $(`<div class="fas-dev"></div>`);
    const $devUi = $(`<div class="fas-ui"></div>`);

    // Create input groups
    const $devModeInput = createInput("Dev Mode", "devMode");
    const $showDevModeInput = createInput("Show Dev Mode", "showDevMode");
    const $logDevModeInput = createInput("Log Dev Mode", "logDevMode");
    const $reloadButton = createButton();

    // Append elements
    $devUi.append($devModeInput, $showDevModeInput, $logDevModeInput, $reloadButton);
    $devContainer.append($devUi);
    $devContainer.insertAfter($knackNavBar); // Append UI to DOM

    // Set checked states **AFTER** inserting into DOM
    $(`input[name="devMode"][value="${knackLs.devMode}"]`).prop("checked", true);
    $(`input[name="showDevMode"][value="${knackLs.showDevMode}"]`).prop("checked", true);
    $(`input[name="logDevMode"][value="${knackLs.consDevMode}"]`).prop("checked", true);
}











