export function getViews(scenes) {

    const views = []
    scenes.forEach(s => {
        const sViews = s.views.models
        sViews.forEach(v=> {
            views.push(v)
        });        
    });

    return views


}