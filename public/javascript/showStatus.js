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
    // Muestra una alerta en la parte superior
    if (status != 'Alert') {
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

        return;
    }

    // Significa que es una alerta que se va a lanzar con Sweet Alerts
    Swal.fire({
        text,
        title: 'Alert!',
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'sweetAlerts alert'
        },
    });
};

/**
 * Clases para borrar las alertas
 */
document.querySelectorAll('.closingStatus').forEach((element) => {
    element.addEventListener('click', () => {
        const container = element.parentElement.parentElement;

        // Anima el borrado
        container.classList.add("statusContainerAnimateHide");
        
        // Borra la animación de entrada
        container.classList.remove("statusContainerAnimate");
    })
});