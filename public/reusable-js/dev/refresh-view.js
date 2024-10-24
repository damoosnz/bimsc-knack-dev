
// test records render on portail client

$(document).on('knack-view-render.view_1157', function (event, view, data) {
    console.log(Knack);
    console.log(Knack.user.attributes.profile_objects);
    console.log(Knack.views);

    let handleEventClickCheck = false;
    // Store the original handleEventClick function
    var originalHandleEventClick = Knack.views['view_1157'].handleEventClick;
    var viewId = view.key;

    // Disable the original handleEventClick function
    // Knack.views['view_1157'].handleEventClick = function () {
    //     await Knack.views[view.key].renderRecords();
    //     console.log('records have rendered');
    // };

    // Knack.views['view_1157'].handleEventClick = async function () {
        console.log('Pre-handle code executed.');


        // Assuming you have the view ID stored in a variable named 'viewId'

        // Get the view object
        var view = Knack.router.scene_view.model.views._byId[viewId];

        if (view) {
            var viewType = view.attributes.type;

            // Check if the view type matches one of the specific types
            if (['search', 'form', 'rich_text', 'menu', 'calendar'].includes(viewType)) {
                // Trigger change events if needed
                Knack.views[viewId].model.trigger('change');

                // Render the view directly
                Knack.views[viewId].render();
                Knack.views[viewId].renderGroups && Knack.views[viewId].renderGroups();
                Knack.views[viewId].postRender && Knack.views[viewId].postRender();
                

                // Additional logic specific to your application
            }
        }



        // await Knack.views[view.key].render();
        // await Knack.views[view.key].renderCalendar();
        // Knack.views['view_1157'].handleEventClick = originalHandleEventClick;

    // };

    // console.log('Pre-handle code executed after 10 seconds');
    // Knack.views['view_1157'].handleEventClick = originalHandleEventClick;





    // Reset the handleEventClick function to its original state
    // Knack.views['view_1157'].handleEventClick = originalHandleEventClick;





});