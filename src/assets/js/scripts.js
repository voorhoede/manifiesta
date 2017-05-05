var time = document.querySelectorAll(".time");

for (var i = time.length - 1; i >= 0; i--) {
    startTime(time[i]);
}

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function startTime(time) {
    var today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes());
    time.innerHTML = h + ":" + m;
    setTimeout(function() {
        startTime(time);
    }, 60000);
}
