export function createDevCheckBox(label, name, val) {
    const $input = $(`
        <div>
            <label>
                <input type="checkbox" name="${name}"> ${label}
            </label>
        </div>
    `);

    // Set the checkbox state
    $input.find(`input[name="${name}"]`).prop("checked", val);

    return $input;
}
