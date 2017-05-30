const createForm = document.querySelector("[data-create-form]"),
    time = document.querySelectorAll(".time"),
    battery = document.querySelectorAll(".battery"),
    websitePhone = document.querySelector("[data-website]"),
    homeScreenPhone = document.querySelector("[data-homescreen]"),
    splashScreenPhone = document.querySelector("[data-splash-screen]"),
    pwaPhone = document.querySelector("[data-pwa]"),
    createFormItems = createForm.querySelectorAll(".dropdown input:not(.field):not(.not), .dropdown select"),
    jsonTextarea = document.querySelector(".json textarea"),
    menuItems = document.querySelectorAll(".app-header-menu li a"),
    screensMenu = document.querySelectorAll(".preview .btn-container .btn"),
    bgColorInput = document.querySelector("#bgcolor"),
    jsonForm = document.querySelector(".json form");

let json = {
        display: "standalone",
    },
    imageFiles = []

for (let i = time.length - 1; i >= 0; i--) {
    startTime(time[i]);
}

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function startTime(time) {
    let today = new Date(),
        h = checkTime(today.getHours()),
        m = checkTime(today.getMinutes());
    time.innerHTML = h + ":" + m;
    setTimeout(function () {
        startTime(time);
    }, 60000);
}

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

for (var i = 0; i < createFormItems.length; i++) {
    createFormItems[i].addEventListener("change", updateJsonObject)
}

jsonTextarea.addEventListener("change", updateJsonInput)

function updateJsonObject() {
    if (this.getAttribute("type") == "file") {
        addIconsToJsonObject(this)
    } else {
        json[this.getAttribute("name")] = this.value
        jsonTextarea.value = JSON.stringify(json, null, 4)
    }
}

function addIconsToJsonObject(el) {
    let arr = [],
        l = el.files.length,
        i = 0

    addIcons(arr, i, el.files, function (result) {
        json['icons'] = result
        jsonTextarea.value = JSON.stringify(json, null, 4)
    })
}

function addIcons(arr, i, files, cb) {
    let fr = new FileReader

    imageFiles = []

    fr.readAsDataURL(files[i]);

    fr.onload = function () {
        let img = new Image

        img.src = fr.result

        img.onload = function () {
            arr.push({
                src: files[i].name,
                type: files[i].type,
                sizes: img.width + "x" + img.height
            })

            imageFiles.push(fr.result)

            if (files.length == i + 1) {
                cb(arr)
            } else {
                i++
                addIcons(arr, i, files, cb)
            }
        }
    }
}

function updateJsonInput() {
    let obj = JSON.parse(this.value)

    for (let item in obj) {
        if (document.querySelector("[name='" + item + "']").getAttribute("type") != "text" && document.querySelector("[name='" + item + "']").getAttribute("type") != "color")
            obj[item] = obj[item].toLowerCase()

        if (document.querySelector("[name='" + item + "']").getAttribute("type") == "radio")
            document.querySelector("[name='" + item + "'][value='" + obj[item] + "']").checked = true

        if (document.querySelector("[name='" + item + "']").getAttribute("type") != "radio")
            document.querySelector("[name='" + item + "']").value = obj[item]
    }
}

for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function (e) {
        e.preventDefault()

        document.querySelectorAll(".show-element")[0].classList.remove("show-element")
        document.querySelector(".app-header-menu li a.active").classList.remove("active")

        this.classList.add("active")
        document.querySelector(e.target.hash).classList.add("show-element");

    })
}

for (var i = 0; i < screensMenu.length; i++) {
    screensMenu[i].addEventListener("click", function () {
        document.querySelectorAll(".device-show")[0].classList.remove("device-show")
        document.querySelector(".preview .btn-container .btn.active").classList.remove("active")

        this.classList.add("active")
        document.querySelector("." + this.getAttribute("data-target")).classList.add("device-show");
    })
}

jsonForm.addEventListener("submit", jsonToScreens)

function jsonToScreens(event) {
    event.preventDefault()
    let createIframe = document.createElement("iframe"),
        Json = JSON.parse(this.querySelector("textarea").value.replace(" ", ""))

    // Website screen
    createIframe.setAttribute("src", Json.websiteUrl)
    websitePhone.querySelector("[data-browser-screen]").innerHTML = ""
    websitePhone.classList.add("in-use")
    websitePhone.querySelector("[data-browser-screen]").appendChild(createIframe)
    websitePhone.querySelector(".chrome-header input").value = Json.websiteUrl
    websitePhone.querySelector("span img").setAttribute("src", imageFiles[0])
    websitePhone.querySelector("h4").innerHTML = Json["short_name"]
    websitePhone.querySelector("p").innerHTML = Json["name"]

    // Home screen
    let homeIconContainer = document.createElement("div"),
        homeIconImage = document.createElement("img"),
        homeIconP = document.createElement("p")

    homeIconContainer.classList.add("home-icon-container")
    homeIconImage.setAttribute("src", imageFiles[0])
    homeIconP.innerHTML = Json["short_name"]

    homeIconContainer.appendChild(homeIconImage)
    homeIconContainer.appendChild(homeIconP)
    homeScreenPhone.querySelector("[data-browser-screen]").innerHTML = ""
    homeScreenPhone.querySelector("[data-browser-screen]").appendChild(homeIconContainer)

    // Splash Screen
    let splashScreen = splashScreenPhone.querySelector("[data-browser-screen]"),
        splashBG = document.createElement("div"),
        splashIMG = document.createElement("img"),
        splashP = document.createElement("p")

    splashScreen.innerHTML = ""
    splashP.innerHTML = Json["short_name"]
    splashIMG.setAttribute("src", imageFiles[0])
    splashBG.appendChild(splashIMG)
    splashBG.appendChild(splashP)
    splashBG.classList.add("splashBG")
    splashBG.style.backgroundColor = Json["background_color"]
    splashScreen.appendChild(splashBG)

    // PWA
    let PWAIframe = document.createElement("iframe")

    PWAIframe.setAttribute("src", Json.websiteUrl)

    pwaPhone.querySelector("[data-browser-screen]").innerHTML = ""
    pwaPhone.classList.add("in-use")
    pwaPhone.querySelector("[data-browser-screen]").appendChild(PWAIframe)

    let scrollDiv = document.createElement("div");
    scrollDiv.classList.add("scrollbar-measure");
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    PWAIframe.style.width = "calc(100% + " + scrollbarWidth + "px)"
}