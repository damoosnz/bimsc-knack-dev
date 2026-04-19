let _jsFilesCache = null;

export function getJsFiles() {
    if (_jsFilesCache) return _jsFilesCache;

    _jsFilesCache = new Promise(resolve => {
        function attempt() {
            const resources = performance.getEntriesByType('resource');

            // Filter for JavaScript files that are loaded from localhost:8888 (neltify CLI)
            const jsFiles = resources.filter(resource =>
                resource.initiatorType === 'script' &&
                resource.name.includes('localhost:8888') &&
                resource.name !== 'http://localhost:8888/reusable-js/_dev/dev-config.js'
            );

            if (jsFiles.length === 0) {
                setTimeout(attempt, 300);
                return;
            }

            resolve(jsFiles.map(f => f.name));
        }

        attempt();
    });

    return _jsFilesCache;
}

export function clearJsFilesCache() {
    _jsFilesCache = null;
}