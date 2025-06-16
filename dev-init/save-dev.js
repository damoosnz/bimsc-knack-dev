export function saveDev1(dev) {
    const optionsToSave = {};

    // Loop through top-level sections
    for (const sectionKey in dev) {
        const section = dev[sectionKey];
        optionsToSave[sectionKey] = {};

        // Loop through each setting in the section
        for (const settingKey in section) {
            const setting = section[settingKey];

            // Only include 'on' values
            if (setting && typeof setting === 'object' && 'on' in setting) {
                optionsToSave[sectionKey][settingKey] = {
                    on: setting.on
                };
            }
        }
    }

    // Save to localStorage
    localStorage.setItem("knackDevOptions", JSON.stringify(optionsToSave));
}

export function saveDev(dev) {
    localStorage.setItem("knackDevOptions", JSON.stringify(dev));
}
