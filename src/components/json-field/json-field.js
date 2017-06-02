const jsonTextarea = document.querySelector(".json textarea"),
    createFormItems = createForm.querySelectorAll(".dropdown input:not(.field):not(.not), .dropdown select"),
    colorPicker = document.querySelectorAll(".color-text, .color-picker"),
    jsonForm = document.querySelector(".json form");

let json = {

    },
    imageFiles = []

for (let i = 0; i < createFormItems.length; i++) {
    createFormItems[i].addEventListener("change", updateJsonObject)
}

for (let i = 0; i < colorPicker.length; i++ ) {
    console.log(colorPicker[i])
    colorPicker[i].addEventListener("change", function(e) {
        colorPickerFunc(colorPicker[i], i)
    })
}

jsonTextarea.addEventListener("change", updateJsonInput)

function updateJsonObject(e, that = this) {
    if (that.getAttribute("type") == "file") {
        addIconsToJsonObject(that)
    } else {
        json[that.getAttribute("name")] = that.value
        jsonTextarea.value = JSON.stringify(json, null, 4)
    }
}

function colorPickerFunc(el, i) {
    let otherEl = colorPicker[i == 1 ? 0 : 1]

    otherEl.value = el.value

    updateJsonObject("", el)
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
    }
}

jsonForm.addEventListener("submit", jsonToScreens)