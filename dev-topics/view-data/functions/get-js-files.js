export function getJsFiles() {

    const resources = performance.getEntriesByType('resource');

    // Filter for JavaScript files that are loaded from localhost:8888 (neltify CLI)
    const jsFiles = resources.filter(resource =>
        resource.initiatorType === 'script' &&
        resource.name.includes('localhost:8888') &&
        resource.name !== 'http://localhost:8888/reusable-js/_dev/dev-config.js'
    );

    return jsFiles.map(f => f.name)
}