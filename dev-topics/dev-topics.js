import { configDev } from "../dev-init/config-dev.js";
import { initDev } from "../dev-init/init-dev.js";

// config the dev object to match the local storage property

let dev = initDev()
dev = configDev(dev)

// run the hanlders based on the dev config
await runEnabledHandlers(dev)

async function runEnabledHandlers1(config) {
    for (const section of Object.values(config)) {
        for (const item of Object.values(section)) {
            if (item?.on && typeof item.handler === 'function') {
                await item.handler(item.on);
            }
        }
    }
}

async function runEnabledHandlers(config) {
    for (const [sKey, section] of Object.entries(config)) {
        for (const [iKey, item] of Object.entries(section)) {
            if (item?.on && typeof item.handler === 'function') {
                await item.handler(item.on);
            }
        }
    }
}




