const navToggle = document.getElementById("openAndCloseNav");
const navBar = document.getElementById("navBar");
const navText = document.querySelectorAll(".toggleText");
const navIcons = document.querySelectorAll(".navIcon");
const finalWidth = "w-32";

// Inicializa en caso de que no esté definida
document.cookie = `navOpened=${getCookieByName("navOpened") == "0" ? "0" : "1"}; max-age=${
    30 * 24 * 60 * 60
}; path=/`;


// Por cada ícono en el nav lo hace cuadrado
navIcons.forEach((navElement) => {
    navElement.style.height = `${navElement.height}px`;
    navElement.style.width = `${navElement.height}px`;
    navElement.style.minHeight = `${navElement.height}px`;
    navElement.style.minWidth = `${navElement.height}px`;
});

// Abre y cierra la nav
navToggle.addEventListener("click", () => {
    // Gira el ícono de abrir y cerrar
    navToggle.classList.toggle("rotate-180");

    // Aparece y desaparece el texto que describe los íconos
    navText.forEach((navElement) => {
        if (navElement.classList.contains("opacity-0")) {
            //Le da opacidad y anchura
            navElement.classList.add("opacity-100", finalWidth);
            navElement.classList.remove("opacity-0", "w-0");
            document.cookie = `navOpened=1; max-age=${
                30 * 24 * 60 * 60
            }; path=/`;
        } else {
            //Le quita opacidad y anchura
            navElement.classList.add("opacity-0", "w-0");
            navElement.classList.remove("opacity-100", finalWidth);
            document.cookie = `navOpened=0; max-age=${
                30 * 24 * 60 * 60
            }; path=/`;
        }
    });
});
