const hamBtn = document.querySelector(".hamburger");
const hamImg = hamBtn.getElementsByTagName("img")[0];
const rightNav = document.querySelector(".nav__links");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
console.log("hamImg", hamImg)
console.log("hamImg", hamBtn)

function toggle(event) {
    console.log("testing");

    if (!rightNav.classList.contains("nav__disp")) {
        hamImg.src = "./assets/images/icons/menu.png";
        rightNav.classList.add("nav__disp")
        main.style.display = "block";
        footer.style.display = "block";

      } else {
        hamImg.src = "./assets/images/icons/cross.png";
        rightNav.classList.remove("nav__disp")
        main.style.display = "none";
        footer.style.display = "none";
      }

}

hamBtn.addEventListener("click", toggle)
