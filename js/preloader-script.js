var bars = [];
var overlay = $("#overlay-screen");
var hidden = $("#hidden");

function progress(path) {

  bars.push(new ProgressBar.Path('#' + path, {
    easing: 'easeOut',
    duration: 7000
  }));

}
progress("Path-1");
progress("Path-2");
progress("Path-3");
progress("Path-4");

document.onreadystatechange = function (e) {
  if (document.readyState == "interactive") {
    // show svg once document is loaded (to prevent FOUC)
    hidden.css("visibility", "visible");
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      set_ele(all[i]);
    }
  }
}
prog_width = 0;
for (var i = 0; i < bars.length; i++) {
  bars[i].set(0);
}

function check_element(ele) {

  var all = document.getElementsByTagName("*");
  var totalele = all.length;
  var per_inc = 100 / all.length;

  if ($(ele).on()) {
    prog_width = per_inc + prog_width;
    console.log(prog_width);
    for (var i = 0; i < bars.length; i++) {
      bars[i].animate(prog_width / 100);
    }

    if (prog_width >= 90) {
      console.log("done")
        //over lay animation starts after 3.2s
        //animate overlay to transition
      overlay.css({
        transform: "translateX(-195%)"
      });
      // Above animation goes on for 4.2s

      //Trying to fade out wrapper when at the moment of transition where screen is completely filled
      $(".wrapper").delay(3612).fadeOut(150);
      overlay.delay(4300).fadeOut();

    }

  } else {
    set_ele(ele);
  }
}

function set_ele(set_element) {
  check_element(set_element);
}
