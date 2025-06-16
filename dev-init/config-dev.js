export function configDev(dev) {
    const options = JSON.parse(localStorage.getItem("knackDevOptions")) || null;

    if (!options) return dev; // Nothing to merge, return as-is

    // Loop through top-level sections (e.g. 'console', 'viewData', etc.)
    for (const sectionKey in options) {
        const sectionOptions = options[sectionKey];
        const devSection = dev[sectionKey];

        // Skip if section doesn't exist in current dev structure
        if (!devSection) continue;

        // Loop through settings inside the section (e.g. 'devLogs', 'key', etc.)
        for (const settingKey in sectionOptions) {
            const settingOptions = sectionOptions[settingKey];
            const devSetting = devSection[settingKey];

            // Skip if this setting doesn't exist in dev
            if (!devSetting) continue;

            // Update the 'on' value if it exists
            if ('on' in settingOptions) {
                devSetting.on = settingOptions.on;
            }

            // Optionally, you can also update other keys if needed (like 'input' or 'label')
            // Object.assign(devSetting, settingOptions); // <- this would overwrite all keys
        }
    }

    return dev;
}