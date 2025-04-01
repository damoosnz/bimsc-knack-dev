export function createDevOptionsInput(label, name) {

    const input = $(`
            <div>
                <label>
                    <input type="checkbox" name="${name}"> ${label}
                </label>
            </div>
        `)
    // console.log('dev input', input.html())
    return input;

}