var x = setInterval(function () {
    let start = Date.parse("13 apr 2022 18:27:00 UTC");
    var now = new Date().getTime();
    var distance = now - start;
    var diff = (distance / (1000 * 60 * 30));
    var minutes = Math.floor((distance % (1000 * 60 * 30)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if ((29 - minutes) < 10) {
        document.getElementById("minutes").innerHTML = "0" + (29 - minutes);
        document.getElementById("minutes2").innerHTML = "0" + (29 - minutes);
        document.getElementById("minutes3").innerHTML = "0" + (29 - minutes);
        // document.getElementById("minutes4").innerHTML = "0" + (14 - minutes);

    } else {
        document.getElementById("minutes").innerHTML = (29 - minutes);
        document.getElementById("minutes2").innerHTML = (29 - minutes);
        document.getElementById("minutes3").innerHTML = (29 - minutes);
        // document.getElementById("minutes4").innerHTML = (14 - minutes);
        
    }
    if ((59 - seconds) < 10) {
        document.getElementById("seconds").innerHTML = "0" + (59 - seconds);
        document.getElementById("seconds2").innerHTML = "0" + (59 - seconds);
        document.getElementById("seconds3").innerHTML = "0" + (59 - seconds);
        // document.getElementById("seconds4").innerHTML = "0" + (59 - seconds);
       
        
    } else {
        document.getElementById("seconds").innerHTML = 59 - seconds;
        document.getElementById("seconds2").innerHTML = 59 - seconds;
        document.getElementById("seconds3").innerHTML = 59 - seconds;
        // document.getElementById("seconds4").innerHTML = 59 - seconds;
    }
    if (minutes == 0 && seconds == 0) {
        console.log("Updating Balance...")
        
    }
}, 1000);