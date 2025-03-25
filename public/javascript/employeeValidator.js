document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const curpInput = document.getElementById("curp");
  const curpFormatError = document.getElementById("curpFormatError");

  const rfcInput = document.getElementById("rfc");
  const rfcFormatError = document.getElementById("rfcFormatError");

  // Expresiones regulares para validaciones
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
  const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;

  // Validar CURP en tiempo real
  curpInput.addEventListener("input", function () {
    const curpValue = curpInput.value.toUpperCase();
    curpInput.value = curpValue; // Convertir automáticamente a mayúsculas

    // Validación de formato
    if (curpValue.length === 18 && !curpRegex.test(curpValue)) {
      curpFormatError.textContent = "Formato incorrecto de CURP.";
    } else {
      curpFormatError.textContent = "";
    }
  });

  // Validar RFC en tiempo real
  rfcInput.addEventListener("input", function () {
    const rfcValue = rfcInput.value.toUpperCase();
    rfcInput.value = rfcValue; // Convertir automáticamente a mayúsculas

    // Validación de formato
    if (rfcValue.length === 13 && !rfcRegex.test(rfcValue)) {
      rfcFormatError.textContent = "Formato incorrecto de RFC.";
    } else {
      rfcFormatError.textContent = "";
    }
  });

  // Prevenir el envío del formulario si las validaciones no son correctas
  form.addEventListener("submit", function (event) {
    let isValid = true;

    // Validación del CURP
    if (curpInput.value.length === 18 && !curpRegex.test(curpInput.value)) {
      curpFormatError.textContent = "Formato incorrecto de CURP.";
      isValid = false;
      curpInput.focus(); // Centra el error en la pantalla
    }

    // Validación del RFC
    if (rfcInput.value.length === 13 && !rfcRegex.test(rfcInput.value)) {
      rfcFormatError.textContent = "Formato incorrecto de RFC.";
      isValid = false;
      rfcInput.focus(); // Centra el error en la pantalla
    }

    // Si no es válido, prevenir el envío del formulario
    if (!isValid) {
      event.preventDefault();
    }
  });
});
