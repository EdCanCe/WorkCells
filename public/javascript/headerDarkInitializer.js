const htmlInit = document.getElementById("html");

document.cookie = `darkMode=${getCookieByName("darkMode") == "1" ? "1" : "0"}; max-age=${
    30 * 24 * 60 * 60
}; path=/`;

if(getCookieByName("darkMode") == "1"){
    htmlInit.classList.add("dark");
} else{
    htmlInit.classList.remove("dark");
}