const navToggle = document.getElementById("openAndCloseNav");
const navBar = document.getElementById("navBar");
const navText = document.querySelectorAll(".toggleText");
const navIcons = document.querySelectorAll(".navIcon");
const finalWidth = "w-32"; // Clase de tailwind

navIcons.forEach((navElement) => {
    navElement.style.height = String(navElement.height) + "px";
    navElement.style.width = String(navElement.height) + "px";
    navElement.style.minHeight = String(navElement.height) + "px";
    navElement.style.minWidth = String(navElement.height) + "px";
});

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("rotate-180");

    navText.forEach((navElement) => {
        if (navElement.classList.contains("opacity-0")) {
            //Abre la nav
            navElement.classList.add("opacity-100", finalWidth);
            navElement.classList.remove("opacity-0", "w-0");
        } else {
            //Cierra la nav
            navElement.classList.add("opacity-0", "w-0");
            navElement.classList.remove("opacity-100", finalWidth);
        }
    });
});
