const htmlInit = document.getElementById("html");

// Inicializa en caso de que no esté definida
document.cookie = `darkMode=${getCookieByName("darkMode") == "1" ? "1" : "0"}; max-age=${
    30 * 24 * 60 * 60
}; path=/`;

// Añade la clase oscura al html para que se carguen los elementos con ese estilo
if(getCookieByName("darkMode") == "1"){
    htmlInit.classList.add("dark");
} else{
    htmlInit.classList.remove("dark");
}