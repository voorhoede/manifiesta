const batteryAll = document.querySelectorAll(".battery");

for (let i = 0; i < batteryAll.length; i++) {
    batteryDevice(batteryAll[i])
}

function batteryDevice(batteryEl) {

    // update battery status info
    function updateBatteryStatus(battery) {

        let batteryString = Math.round(battery.level * 100) + '%';

        // update graphic etc
        batteryEl.querySelector('.batterylevel').style.transform = 'scaleY(' + battery.level + ')';
        let chargeSymbolOpacity = (battery.charging) ? 1 : 0;
        batteryEl.querySelector('.chargingsymbol').style.opacity = chargeSymbolOpacity;
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
    let battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
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
}