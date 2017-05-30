const menuItems = document.querySelectorAll(".app-header-menu li a");

for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function (e) {
        e.preventDefault()

        document.querySelectorAll(".show-element")[0].classList.remove("show-element")
        document.querySelector(".app-header-menu li a.active").classList.remove("active")

        this.classList.add("active")
        document.querySelector(e.target.hash).classList.add("show-element");
    })
}