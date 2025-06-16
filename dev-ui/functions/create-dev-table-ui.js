export function createDevUiTable() {

    const $devUiTable = $(`
    <table>
        <thead>
            <tr>
                <td>Dev Mode</td>
                <td>Console Logs</td>
                <td>View Data</td>
                <td>Field</td>
                <td>Search App</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="devMode"></td>
                <td id="console"></td>
                <td id="viewData"></td>
                <td id="fieldsData"></td>
                <td id="searchApp"></td>
            </tr>
        </tbody>
    </table>
    `)

    return $devUiTable


}

