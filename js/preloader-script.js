var bars = [];
var overlay = $("#overlay-screen");
var hidden = $("#hidden");

// Check if we need to show the preloader
if (document.cookie) {
    // This means that a cookie is present and we are just revisitng the main site
    // in the same session
    $('.wrapper').hide();
} else {
    document.cookie = "firstTime";
    //Initializing and adding to Progress Bar array
    progress("Path-1");
    progress("Path-2");
    progress("Path-3");
    progress("Path-4");

    document.onreadystatechange = function(e) {
        if (document.readyState == "interactive") {
            // show svg once document is loaded (to prevent FOUC)
            hidden.css("visibility", "visible");
        }
    }

    //Starting with zero progress for every bar
    for (var i = 0; i < bars.length; i++) {
        bars[i].set(0);
    }

    Pace.on("change", function(progress) {
        if (progress > 90) {
            //Enough progress, load the next screen
            for (var i = 0; i < bars.length; i++) {
                bars[i].animate(1);
            }
            //over lay animation starts after 3.2s
            //animate overlay to transition
            overlay.css({
                transform: "translateX(-195%)"
            });
            // Above animation goes on for 4.2s

            //Trying to fade out wrapper when at the moment of transition where screen is completely filled
            $(".wrapper").delay(3612).fadeOut(150);
            // Fading out progress counter at the same time
            $(".pace").delay(3612).fadeOut(0);
            overlay.delay(4300).fadeOut();
        } else {
            //Continue animating progress bars
            for (var i = 0; i < bars.length; i++) {
                bars[i].animate(progress / 100);
            }
        }
    });

}

function progress(path) {

    bars.push(new ProgressBar.Path('#' + path, {
        easing: 'easeOut',
        duration: 5000
    }));
}