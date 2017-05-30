const jsonTextarea = document.querySelector(".json textarea"),
    createFormItems = createForm.querySelectorAll(".dropdown input:not(.field):not(.not), .dropdown select"),
    jsonForm = document.querySelector(".json form");

let json = {
        display: "standalone",
    },
    imageFiles = []

var (var i = 0; i < createFormItems.length; i++) {
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

jsonForm.addEventListener("submit", jsonToScreens)