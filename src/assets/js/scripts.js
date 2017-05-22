var time = document.querySelectorAll(".time");

const createForm = document.querySelector("[data-create-form]"),
websitePhone = document.querySelector("[data-website]"),
homeScreenPhone = document.querySelector("[data-homescreen]"),
splashScreenPhone = document.querySelector("[data-splash-screen]"),
pwaPhone = document.querySelector("[data-pwa]"),
createFormItems = createForm.querySelectorAll(".dropdown input:not(.field):not(.not), .dropdown select"),
jsonTextarea = document.querySelector(".json textarea"),
menuItems = document.querySelectorAll(".app-header-menu li a")
screensMenu = document.querySelectorAll(".preview .btn-container .btn"),
bgColorInput = document.querySelector("#bgcolor"),
jsonForm = document.querySelector(".json form")

let json = {
   display: "standalone",
   websiteUrl :"https://www.voorhoede.nl"
},
imageFiles = []

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


for (var i = 0; i < createFormItems.length; i++) {
   createFormItems[i].addEventListener("change", updateJsonObject)
}

jsonTextarea.addEventListener("change", updateJsonInput)

function updateJsonObject() {
   if (this.getAttribute("type") == "file") {
      addIconsToJsonObject(this)
   } else {
      json[this.getAttribute("name")] = this.value
      jsonTextarea.value = makeMyJsonPretty(JSON.stringify(json))
   }
}


function makeMyJsonPretty(json) {
   let newJson = json.replace(/{/g, "{\n   ")
   newJson = newJson.replace(/}/g, "\n}")
   newJson = newJson.replace(/[\[']+/g, "[\n   ")
   newJson = newJson.replace(/\}\]/g, "   }\n   ]")
   newJson = newJson.replace(/},/g, "   },")
   newJson = newJson.replace(/,/g, ",\n   ")
   newJson = newJson.replace(/"src/g, '\u0020\u0020\u0020"src')
   newJson = newJson.replace(/"type/g, '\u0020\u0020\u0020"type')
   newJson = newJson.replace(/"sizes/g, '\u0020\u0020\u0020"sizes')


   return newJson
}

function addIconsToJsonObject(el) {
   let arr = [],
   l = el.files.length,
   i = 0

   addIcons(arr, i, el.files, function(result) {
      json['icons'] = result
      jsonTextarea.value = makeMyJsonPretty(JSON.stringify(json))
      console.log(imageFiles);
      console.log(jsonTextarea);
      console.log(jsonTextarea.innerHTML);
      console.log(makeMyJsonPretty(JSON.stringify(json)));
   })
}

function addIcons(arr, i, files, cb) {
   let fr = new FileReader

   imageFiles = []

   fr.readAsDataURL(files[i]);

   fr.onload = function() {
      let img = new Image

      img.src = fr.result


      img.onload = function() {
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
      if (document.querySelector("[name='"+item+"']").getAttribute("type") != "text" && document.querySelector("[name='"+item+"']").getAttribute("type") != "color")
         obj[item] = obj[item].toLowerCase()

      if(document.querySelector("[name='"+item+"']").getAttribute("type") == "radio")
         document.querySelector("[name='"+item+"'][value='"+obj[item]+"']").checked = true

      if (document.querySelector("[name='"+item+"']").getAttribute("type") != "radio")
         document.querySelector("[name='"+item+"']").value = obj[item]
   }
}


for (var i = 0; i < menuItems.length; i++) {
   menuItems[i].addEventListener("click", function(e) {
      e.preventDefault()

      document.querySelectorAll(".show-element")[0].classList.remove("show-element")
      document.querySelector(".app-header-menu li a.active").classList.remove("active")

      this.classList.add("active")
      document.querySelector(e.target.hash).classList.add("show-element");

   })
}

for (var i = 0; i < screensMenu.length; i++) {
   screensMenu[i].addEventListener("click", function() {
      document.querySelectorAll(".device-show")[0].classList.remove("device-show")
      document.querySelector(".preview .btn-container .btn.active").classList.remove("active")

      this.classList.add("active")
      document.querySelector("."+this.getAttribute("data-target")).classList.add("device-show");
   })
}


// if (bgColorInput.type != "color") {
//    // IF WE EVER WANT A IE11 FALLBACK FOR COLORPICKER
//    // EDGE WORKS
// }


jsonForm.addEventListener("submit", jsonToScreens)

function jsonToScreens(event) {
   event.preventDefault()
   let createIframe = document.createElement("iframe"),
   Json = JSON.parse(this.querySelector("textarea").value.replace(" ", ""))

   console.log(Json);

   // Website screen
   createIframe.setAttribute("src", Json.websiteUrl)
   websitePhone.querySelector("[data-browser-screen]").innerHTML = ""
   websitePhone.classList.add("in-use")
   websitePhone.querySelector("[data-browser-screen]").appendChild(createIframe)
   websitePhone.querySelector(".chrome-header input").value = Json.websiteUrl
   websitePhone.querySelector("span img").setAttribute("src", imageFiles[0])
   websitePhone.querySelector("h3").innerHTML = Json["short_name"]
   websitePhone.querySelector("p").innerHTML = Json.name
   // websitePhone.querySelector(".notification p span").innerHTML = Json.websiteUrl

   // Home screen
   let homeIconContainer = document.createElement("div"),
   homeIconImage = document.createElement("img"),
   homeIconP = document.createElement("p")

   homeIconContainer.classList.add("home-icon-container")
   homeIconImage.setAttribute("src", imageFiles[0])
   homeIconP.innerHTML = Json.name

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
   splashP.innerHTML = Json.name
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
    console.log(scrollbarWidth); // Mac:  15
    document.body.removeChild(scrollDiv);

    PWAIframe.style.width = "calc(100% + "+scrollbarWidth+"px)"
}
