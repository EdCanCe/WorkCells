document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const curpInput = document.getElementById("curp");
    const curpFormatError = document.getElementById("curpFormatError");

    const rfcInput = document.getElementById("rfc");
    const rfcFormatError = document.getElementById("rfcFormatError");

    const nameFields = document.querySelectorAll("#birthName, #surname");

    const mailInput = document.getElementById("mail");
    const mailFormatError = document.getElementById("mailFormatError");

    const phoneNumberInput = document.getElementById("phoneNumber");
    const phoneNumberError = document.getElementById("phoneNumberError");

    // Campos adicionales del formulario
    /*const additionalFields = document.querySelectorAll(
        "#birthName, #surname, #mail, #zipCode, #houseNumber, #streetName, #colony, #phoneNumber, #countryUserIDFK, #workModality, #userRoleIDFK, #prioritaryDepartmentIDFK"
    );*/

    // Expresiones regulares para validaciones
    const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
    const lettersRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Solo letras y espacios
    const phoneNumberRegex = /^[0-9 ]*$/;
    const mailRegex =
        /^[a-zA-Z0-9._%+-]+@(nuclea\.solutions|zogzag\.house|we\.page|moca\.app|maya\.protocol)$/;

    mailInput.addEventListener("input", function () {
        const value = mailInput.value;
        if (value.length === 0) {
            mailFormatError.classList.add('hidden');
            mailFormatError.textContent = "";
            mailInput.setCustomValidity("");
        } else {
            if (!mailRegex.test(value)) {
                mailFormatError.classList.remove('hidden');
                mailFormatError.textContent =
                    "The e-mail format or domain is wrong.";
                mailInput.setCustomValidity(
                    "The e-mail format or domain is wrong"
                );
            } else {
                mailFormatError.classList.add('hidden');
                mailFormatError.textContent = "";
                mailInput.setCustomValidity(""); // Restablecer el mensaje si es válido
            }
        }
    });

    phoneNumberInput.addEventListener("input", function () {
        const value = phoneNumberInput.value;
        if (!phoneNumberRegex.test(value)) {
            phoneNumberError.classList.remove('hidden');
            phoneNumberError.textContent =
                "The phone number should be numbers only.";
            phoneNumberInput.setCustomValidity(
                "The phone number should be numbers only."
            );
        } else {
            phoneNumberError.classList.add('hidden');
            phoneNumberError.textContent = "";
            phoneNumberInput.setCustomValidity("");
        }
    });

    // Validar CURP en tiempo real
    curpInput.addEventListener("input", function () {
        const curpValue = curpInput.value.toUpperCase();
        curpInput.value = curpValue; // Convertir automáticamente a mayúsculas

        if (curpValue.length === 0) {
            curpFormatError.classList.add('hidden');
            curpFormatError.textContent = "";
            curpInput.setCustomValidity("");
        } else {
            if (curpValue.length < 18) {
                curpFormatError.classList.remove('hidden');
                curpFormatError.textContent =
                    "CURP must be 18 characters long.";
                curpInput.setCustomValidity("CURP must be 18 characters long.");
            } else if (!curpRegex.test(curpValue)) {
                curpFormatError.classList.remove('hidden');
                curpFormatError.textContent = "Incorrect CURP format.";
                curpInput.setCustomValidity("Incorrect CURP format.");
            } else {
                curpFormatError.classList.add('hidden');
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
            rfcFormatError.classList.add('hidden');
            rfcFormatError.textContent = "";
            rfcInput.setCustomValidity("");
        } else {
            if (rfcValue.length < 13) {
                rfcFormatError.classList.remove('hidden');
                rfcFormatError.textContent = "RFC must be 13 characters long.";
                rfcInput.setCustomValidity("RFC must be 13 characters long.");
            } else if (!rfcRegex.test(rfcValue)) {
                rfcFormatError.classList.remove('hidden');
                rfcFormatError.textContent = "Incorrect RFC format.";
                rfcInput.setCustomValidity("Incorrect RFC format.");
            } else {
                rfcFormatError.classList.add('hidden');
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
        let errorSpan = document.createElement("p");
        errorSpan.classList.add("textDanger");
        errorSpan.classList.add("text-sm");
        errorSpan.classList.add("mb-2");
        field.insertAdjacentElement("afterend", errorSpan);

        field.addEventListener("input", function () {
            const value = field.value;
            if (value.length === 0) {
                errorSpan.classList.add('hidden');
                errorSpan.textContent = "";
                field.setCustomValidity("");
            } else {
                if (!lettersRegex.test(value)) {
                    errorSpan.classList.remove('hidden');
                    errorSpan.textContent =
                        "It must not contain numbers or special characters.";
                    field.setCustomValidity(
                        "It must not contain numbers or special characters."
                    );
                } else {
                    errorSpan.classList.add('hidden');
                    errorSpan.textContent = "";
                    field.setCustomValidity(""); // Restablecer el mensaje si es válido
                }
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

        if (!phoneNumberRegex.test(phoneNumberInput.value)) {
            phoneNumberError.classList.remove('hidden');
            phoneNumberError.textContent =
                "The phone number should be numbers only.";
            phoneNumberInput.setCustomValidity(
                "The phone number should be numbers only."
            );
        } else {
            phoneNumberError.classList.add('hidden');
            phoneNumberError.textContent = "";
            phoneNumberInput.setCustomValidity("");
        }

        if (!mailRegex.test(mailInput.value)) {
            mailFormatError.classList.remove('hidden');
            mailFormatError.textContent =
                "The e-mail format or domain is wrong.";
            mailInput.setCustomValidity("The e-mail format or domain is wrong");
            isValid = false;
        } else {
            mailFormatError.classList.add('hidden');
            mailFormatError.textContent = "";
            mailInput.setCustomValidity("");
        }

        nameFields.forEach((field) => {
            let errorSpan = field.nextElementSibling;
            if (!lettersRegex.test(field.value)) {
                errorSpan.classList.remove('hidden');
                errorSpan.textContent = "Only letters and spaces are allowed.";
                field.setCustomValidity("Only letters and spaces are allowed.");
                isValid = false;
            } else {
                errorSpan.classList.add('hidden');
                errorSpan.textContent = "";
                field.setCustomValidity("");
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
});
