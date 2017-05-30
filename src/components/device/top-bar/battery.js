const battery = document.querySelectorAll(".battery");

window.onload = function () {

    // update battery status info
    function updateBatteryStatus(battery) {

        var batteryString = Math.round(battery.level * 100) + '%';

        // update graphic etc
        document.querySelector('.batterylevel').style.transform = 'scaleY(' + battery.level + ')';
        var chargeSymbolOpacity = (battery.charging) ? 1 : 0;
        document.querySelector('.chargingsymbol').style.opacity = chargeSymbolOpacity;
    }

    // new getBattery() method (Chrome, Opera)
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function (battery) {

            updateBatteryStatus(battery);

            battery.onchargingchange = function () {
                updateBatteryStatus(battery);
            };

            battery.onlevelchange = function () {
                updateBatteryStatus(battery);
            };

            battery.onchargingtimechange = function () {
                updateBatteryStatus(battery);
            };

            battery.ondischargingtimechange = function () {
                updateBatteryStatus(battery);
            };
        });
    }

    // old navigator.battery method (Firefox only?)
    var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
    if (battery) {

        updateBatteryStatus(battery);

        battery.onchargingchange = function () {
            updateBatteryStatus(battery);
        };

        battery.onlevelchange = function () {
            updateBatteryStatus(battery);
        };

        battery.onchargingtimechange = function () {
            updateBatteryStatus(battery);
        };

        battery.ondischargingtimechange = function () {
            updateBatteryStatus(battery);
        };
    }
};