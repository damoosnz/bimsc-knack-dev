export function getFields(objects) {

    const fields = []
    objects.forEach(obj => {
        obj.fields.models.forEach(fld => {
            fields.push(fld);  // Add each field to the fields array
        });
    });

    return fields
    
}