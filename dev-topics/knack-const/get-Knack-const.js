export function getKnackConst() {

    // objects
    const objects = Knack.objects.models

    // fields
    const fields = []
    objects.forEach(obj => {
        obj.fields.forEach(fld => {
            fields.push(fld);  // Add each field to the fields array
        });
    });
    return { objects, fields }

}




