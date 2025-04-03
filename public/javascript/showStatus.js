/**
 * Hace aparecer y desaparecer una notificación de estado:
 *  - Información
 *  - Advertencia
 *  - Alerta
 * 
 * @param text status   El tipo de estado a mostrar
 * @param text text     Mensaje a mostrar
 */
const showStatus = (status, text) => {
    const container = document.querySelector(`.bgStatus${status}`);
    const bar = document.querySelector(`.bgStatus${status} .statusBar`);
    const textContainer = document.querySelector(`.bgStatus${status} .statusText`);

    // Empieza la animación de los estados
    container.classList.add("statusContainerAnimate");
    bar.classList.add("statusBarAnimate");
    textContainer.innerHTML = text;

    // En el momento que la animación termine, quita la clase
    container.addEventListener("animationend", () => {
        container.classList.remove("statusContainerAnimate");
        bar.classList.remove("statusBarAnimate");
    });
};