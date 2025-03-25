document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const curpInput = document.getElementById("curp");
  const curpFormatError = document.getElementById("curpFormatError");

  const rfcInput = document.getElementById("rfc");
  const rfcFormatError = document.getElementById("rfcFormatError");

  // Campos adicionales
  const additionalFields = document.querySelectorAll(
    "#birthName, #surname, #mail, #zipCode, #houseNumber, #streetName, #colony, #countryUserIDFK, #workModality, #userRoleIDFK"
  );
  const submitButton = form.querySelector("button[type='submit']");

  // Expresiones regulares para validaciones
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
  const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;

  // Validar CURP en tiempo real
  curpInput.addEventListener("input", function () {
    const curpValue = curpInput.value.toUpperCase();
    curpInput.value = curpValue; // Convertir automáticamente a mayúsculas

    // Validación de formato
    if (curpValue.length < 18) {
      curpFormatError.textContent = "CURP debe tener 18 caracteres.";
    } else if (!curpRegex.test(curpValue)) {
      curpFormatError.textContent = "Formato incorrecto de CURP.";
    } else {
      curpFormatError.textContent = "";
      // Habilitar el RFC solo después de que el CURP sea correcto
      rfcInput.removeAttribute("disabled");
    }

    // Si el CURP no es válido, deshabilitar el RFC
    if (!curpRegex.test(curpValue) || curpValue.length < 18) {
      rfcInput.setAttribute("disabled", true);
    }
  });

  // Validar RFC en tiempo real
  rfcInput.addEventListener("input", function () {
    const rfcValue = rfcInput.value.toUpperCase();
    rfcInput.value = rfcValue; // Convertir automáticamente a mayúsculas

    // Validación de formato
    if (rfcValue.length < 13) {
      rfcFormatError.textContent = "RFC debe tener 13 caracteres.";
    } else if (!rfcRegex.test(rfcValue)) {
      rfcFormatError.textContent = "Formato incorrecto de RFC.";
    } else {
      rfcFormatError.textContent = "";
    }

    // Habilitar o deshabilitar los campos y el botón de envío según el RFC
    if (rfcRegex.test(rfcValue) && rfcValue.length === 13) {
      additionalFields.forEach((field) => field.removeAttribute("disabled"));
      submitButton.removeAttribute("disabled");
    } else {
      additionalFields.forEach((field) => field.setAttribute("disabled", true));
      submitButton.setAttribute("disabled", true);
    }
  });

  // Prevenir el envío del formulario si las validaciones no son correctas
  form.addEventListener("submit", function (event) {
    let isValid = true;

    // Validación del CURP
    if (curpInput.value.length < 18 || !curpRegex.test(curpInput.value)) {
      curpFormatError.textContent =
        "CURP debe tener 18 caracteres y el formato correcto.";
      isValid = false;
    }

    // Validación del RFC
    if (rfcInput.value.length < 13 || !rfcRegex.test(rfcInput.value)) {
      rfcFormatError.textContent =
        "RFC debe tener 13 caracteres y el formato correcto.";
      isValid = false;
    }

    // Si no es válido, prevenir el envío del formulario
    if (!isValid) {
      event.preventDefault();
    }
  });
});
