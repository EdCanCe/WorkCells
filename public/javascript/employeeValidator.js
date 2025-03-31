document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const curpInput = document.getElementById("curp");
    const curpFormatError = document.getElementById("curpFormatError");

    const rfcInput = document.getElementById("rfc");
    const rfcFormatError = document.getElementById("rfcFormatError");

    const nameFields = document.querySelectorAll("#birthName, #surname");

    const mailInput = document.getElementById("mail");
    const mailFormatError = document.getElementById("mailFormatError");

    // Campos adicionales del formulario
    const additionalFields = document.querySelectorAll(
        "#birthName, #surname, #mail, #zipCode, #houseNumber, #streetName, #colony, #countryUserIDFK, #workModality, #userRoleIDFK, #prioritaryDepartmentIDFK"
    );

    // Expresiones regulares para validaciones
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
    const lettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Solo letras y espacios
    const mailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|nuclea\.solution)$/;

    mailInput.addEventListener("input", function () {
        const value = mailInput.value;
        if (!mailRegex.test(value)) {
            mailFormatError.textContent =
                "The e-mail format or domain is wrong.";
            mailInput.setCustomValidity("The e-mail format or domain is wrong");
        } else {
            mailFormatError.textContent = "";
            mailInput.setCustomValidity(""); // Restablecer el mensaje si es válido
        }
    });

    // Validar CURP en tiempo real
    curpInput.addEventListener("input", function () {
        const curpValue = curpInput.value.toUpperCase();
        curpInput.value = curpValue; // Convertir automáticamente a mayúsculas

        if (curpValue.length === 0) {
            curpFormatError.textContent = "";
            curpInput.setCustomValidity("");
        } else {
            if (curpValue.length < 18) {
                curpFormatError.textContent =
                    "CURP must be 18 characters long.";
                curpInput.setCustomValidity("CURP must be 18 characters long.");
            } else if (!curpRegex.test(curpValue)) {
                curpFormatError.textContent = "Incorrect CURP format.";
                curpInput.setCustomValidity("Incorrect CURP format.");
            } else {
                curpFormatError.textContent = "";
                curpInput.setCustomValidity("");
            }

            /*if (!curpRegex.test(curpValue) || curpValue.length < 18) {
            rfcInput.setAttribute("disabled", true);
        }*/
        }
    });

    // Validar RFC en tiempo real
    rfcInput.addEventListener("input", function () {
        const rfcValue = rfcInput.value.toUpperCase();
        rfcInput.value = rfcValue; // Convertir automáticamente a mayúsculas

        if (rfcValue.length === 0) {
            rfcFormatError.textContent = "";
            rfcInput.setCustomValidity("");
        } else {
            if (rfcValue.length < 13) {
                rfcFormatError.textContent = "RFC must be 13 characters long.";
                rfcInput.setCustomValidity("RFC must be 13 characters long.");
            } else if (!rfcRegex.test(rfcValue)) {
                rfcFormatError.textContent = "Incorrect RFC format.";
                rfcInput.setCustomValidity("Incorrect RFC format.");
            } else {
                rfcFormatError.textContent = "";
                rfcInput.setCustomValidity("");
            }

            /*if (rfcRegex.test(rfcValue) && rfcValue.length === 13) {
            additionalFields.forEach((field) =>
                field.removeAttribute("disabled")
            );
        } else {
            additionalFields.forEach((field) =>
                field.setAttribute("disabled", true)
            );
        }*/
        }
    });

    nameFields.forEach((field) => {
        let errorSpan = document.createElement("span");
        errorSpan.classList.add("error-message");
        errorSpan.style.color = "#DC2626";
        field.insertAdjacentElement("afterend", errorSpan);

        field.addEventListener("input", function () {
            const value = field.value;
            if (!lettersRegex.test(value)) {
                errorSpan.textContent =
                    "It must not contain numbers or special characters.";
                field.setCustomValidity(
                    "It must not contain numbers or special characters."
                );
            } else {
                errorSpan.textContent = "";
                field.setCustomValidity(""); // Restablecer el mensaje si es válido
            }
        });
    });

    // Prevenir el envío del formulario si las validaciones no son correctas
    form.addEventListener("submit", function (event) {
        let isValid = true;

        /*if (curpInput.value.length < 18 || !curpRegex.test(curpInput.value)) {
            curpFormatError.textContent =
                "CURP must be 18 characters long and in the correct format.";
            curpInput.setCustomValidity(
                "CURP must be 18 characters long and in the correct format."
            );
            isValid = false;
        } else {
            curpFormatError.textContent = "";
            curpInput.setCustomValidity("");
        }

        if (rfcInput.value.length < 13 || !rfcRegex.test(rfcInput.value)) {
            rfcFormatError.textContent =
                "RFC must be 13 characters long and in the correct format.";
            rfcInput.setCustomValidity(
                "RFC must be 13 characters long and in the correct format."
            );
            isValid = false;
        } else {
            rfcFormatError.textContent = "";
            rfcInput.setCustomValidity("");
        }*/

        if (!mailRegex.test(mailInput.value)) {
            mailFormatError.textContent =
                "The e-mail format or domain is wrong.";
            mailInput.setCustomValidity("The e-mail format or domain is wrong");
            isValid = false;
        } else {
            mailFormatError.textContent = "";
            mailInput.setCustomValidity(""); // Restablecer el mensaje si es válido
        }

        nameFields.forEach((field) => {
            let errorSpan = field.nextElementSibling;
            if (!lettersRegex.test(field.value)) {
                errorSpan.textContent = "Only letters and spaces are allowed.";
                field.setCustomValidity("Only letters and spaces are allowed.");
                isValid = false;
            } else {
                errorSpan.textContent = "";
                field.setCustomValidity("");
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
});
