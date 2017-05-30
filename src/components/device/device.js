const screensMenu = document.querySelectorAll(".preview .btn-container .btn"),
    createForm = document.querySelector("[data-create-form]"),
    websitePhone = document.querySelector("[data-website]"),
    homeScreenPhone = document.querySelector("[data-homescreen]"),
    splashScreenPhone = document.querySelector("[data-splash-screen]"),
    pwaPhone = document.querySelector("[data-pwa]");

for (var i = 0; i < screensMenu.length; i++) {
    screensMenu[i].addEventListener("click", function () {
        document.querySelectorAll(".device-show")[0].classList.remove("device-show")
        document.querySelector(".preview .btn-container .btn.active").classList.remove("active")

        this.classList.add("active")
        document.querySelector("." + this.getAttribute("data-target")).classList.add("device-show");
    })
}

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