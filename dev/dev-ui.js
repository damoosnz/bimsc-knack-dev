const $knackNavBar = $('.kn-info-bar')

// Retrieve values from localStorage (moved outside the function)
const knackLs = {
    devMode: localStorage.getItem("knackDevMode") || "no",
    showDevMode: localStorage.getItem("showDevEnvInfo") || "no",
    consDevMode: localStorage.getItem("showDevConsInfo") || "no"
};

console.log('knackLs',knackLs)

addDevBar()

function addDevBar() {
    // Prepare the HTML for the dev bar
    const $devUi = `
        <div class="fas-dev">
            <div class="fas-ui">
                <label>Dev Mode:</label>
                <input type="radio" name="devMode" value="yes"> Yes
                <input type="radio" name="devMode" value="no"> No

                <label>Show Dev Mode:</label>
                <input type="radio" name="showDevMode" value="yes"> Yes
                <input type="radio" name="showDevMode" value="no"> No

                <label>Log Dev Mode:</label>
                <input type="radio" name="logDevMode" value="yes"> Yes
                <input type="radio" name="logDevMode" value="no"> No

                <button id="reloadBtn">Reload</button>
            </div>
        </div>
    `;

    // Set radio button checked state based on knackLs values
    $(`input[name="devMode"][value="${knackLs.devMode}"]`).prop("checked", true);
    $(`input[name="showDevMode"][value="${knackLs.showDevMode}"]`).prop("checked", true);
    $(`input[name="logDevMode"][value="${knackLs.consDevMode}"]`).prop("checked", true);

    // Reload button click event
    $("#reloadBtn").on("click", function () {
        // Update localStorage with selected values
        localStorage.setItem("knackDevMode", $(`input[name="devMode"]:checked`).val());
        localStorage.setItem("showDevEnvInfo", $(`input[name="showDevMode"]:checked`).val());
        localStorage.setItem("showDevConsInfo", $(`input[name="logDevMode"]:checked`).val());

        // Reload the page
        location.reload();
    });

    // Insert the UI into the DOM after the navbar
    $($devUi).insertAfter($knackNavBar); // Append UI to DOM
}











