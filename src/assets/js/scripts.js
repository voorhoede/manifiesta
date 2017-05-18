var time = document.querySelectorAll(".time");

const createForm = document.querySelector("[data-create-form]"),
createFormItems = createForm.querySelectorAll(".dropdown input:not(.field):not(.not), .dropdown select"),
jsonTextarea = document.querySelector("#json textarea")

let json = {
   display: "standalone",
}

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


function updateJsonObject() {
   if (this.getAttribute("type") == "file") {
      addIconsToJsonObject(this)
   } else {
      json[this.getAttribute("name")] = this.value
      jsonTextarea.innerHTML = makeMyJsonPretty(JSON.stringify(json))
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
      jsonTextarea.innerHTML = makeMyJsonPretty(JSON.stringify(json))
   })
}

function addIcons(arr, i, files, cb) {
   let fr = new FileReader


   fr.readAsDataURL(files[i]);

   fr.onload = () => {
      let img = new Image

      img.src = fr.result

      img.onload = () => {
         arr.push({
            src: files[i].name,
            type: files[i].type,
            sizes: img.width + "x" + img.height
         })

         if (files.length == i + 1) {
            cb(arr)
         } else {
            i++
            addIcons(arr, i, files, cb)
         }
      }
   }
}
