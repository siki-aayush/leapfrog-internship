const hamBtn = document.querySelector(".ham");
const hamImg = hamBtn.getElementsByTagName("img")[0];
const navLinks = document.querySelector(".navbar__links");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

function toggle(event) {
    if (!navLinks.classList.contains("active")) {
        hamImg.src = "./assets/images/icons/cross.png";
        navLinks.classList.add("active")
        main.style.display = "none";
        footer.style.display = "none";
    } else {
        hamImg.src = "./assets/images/icons/menu.png";
        navLinks.classList.remove("active");
        setTimeout(() => {
            main.style.display = "block";
            footer.style.display = "block";
        }, 350)
      }

}

hamBtn.addEventListener("click", toggle)
