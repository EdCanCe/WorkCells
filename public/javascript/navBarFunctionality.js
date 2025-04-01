const navToggle = document.getElementById("openAndCloseNav");
const navBar = document.getElementById("navBar");
const navText = document.querySelectorAll(".toggleText");
const navIcons = document.querySelectorAll(".navIcon");
const finalWidth = "w-32"; // Clase de tailwind

document.cookie = `navOpened=${getCookieByName("navOpened") == "0" ? "0" : "1"}; max-age=${
    30 * 24 * 60 * 60
}; path=/`;

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
            document.cookie = `navOpened=1; max-age=${
                30 * 24 * 60 * 60
            }; path=/`;
        } else {
            //Cierra la nav
            navElement.classList.add("opacity-0", "w-0");
            navElement.classList.remove("opacity-100", finalWidth);
            document.cookie = `navOpened=0; max-age=${
                30 * 24 * 60 * 60
            }; path=/`;
        }
    });
});
