(function() {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }
    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes());
        document.querySelectorAll("span").innerHTML = h + ":" + m;
        setTimeout(function() {
            startTime();
        }, 500);
    }
    
    startTime();
    console.log(startTime);
})();
