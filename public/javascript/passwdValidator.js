// Expresiones regulares para validar la fortaleza de la contraseña
const specialCharacters = /[!"#$%&/()\=?¡+*{}\[\];:,.|°]/;
const upperCharacters = /[A-Z]/;
const numericCharacters = /\d/;


const currentPasswordField = document.getElementById("currentPassword");
const currentPasswordError = document.getElementById("currentPasswordError");

// Obtención de los elementos del DOM
const newPasswordField = document.getElementById("newPassword");
const confirmNewPasswordField = document.getElementById("confirmNewPassword");

const newPasswordError = document.getElementById("newPasswordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Función para validar la fortaleza de la nueva contraseña
function validatePasswordStrength() {
    const value = newPasswordField.value;
    let message = '';

    // Verificar mayúscula
    if (upperCharacters.test(value)) {
        message += '<p class="text-green-600"> ✅ One capital letter</p>';
    } else {
        message += '<p class="text-red-600"> ❌ One capital letter</p>';
    }
    // Verificar carácter especial
    if (specialCharacters.test(value)) {
        message += '<p class="text-green-600"> ✅ One special character</p>';
    } else {
        message += '<p class="text-red-600"> ❌ One special character</p>';
    }
    // Verificar número
    if (numericCharacters.test(value)) {
        message += '<p class="text-green-600"> ✅ One number</p>';
    } else {
        message += '<p class="text-red-600"> ❌ One number</p>';
    }
    // Verificar longitud mayor a 8
    if (value.length > 8) {
        message += '<p class="text-green-600">✅ More than 8 characters </p>';
    } else {
        message += '<p class="text-red-600"> ❌ More than 8 characters </p>';
    }

    newPasswordError.innerHTML = message;
}

// Función para verificar que las contraseñas coincidan
function validatePasswordMatch() {
    const newPassword = newPasswordField.value;
    const confirmPassword = confirmNewPasswordField.value;
    const currentPassword = currentPasswordField ? currentPasswordField.value : '';

    if (newPassword.length || confirmPassword.length) {
        if (newPassword === confirmPassword) {
            confirmPasswordError.innerHTML = '<p class="text-green-600">✅ Password match</p>';
            if (currentPasswordField && currentPassword && newPassword === currentPassword) {
                confirmPasswordError.innerHTML += '<p class="text-red-600">❌ New password must be different from current password</p>';
            }
        } else {
            confirmPasswordError.innerHTML = '<p class="text-red-600">❌ Passwords do not match</p>';
        }
    } else {
        confirmPasswordError.innerHTML = '';
    }
}

// Añadir eventListener para actualizar la fortaleza y validar la coincidencia
newPasswordField.addEventListener("input", function() {
    validatePasswordStrength();
    validatePasswordMatch();
});

confirmNewPasswordField.addEventListener("input", function() {
    validatePasswordMatch();
});

document.addEventListener('DOMContentLoaded', function() {
    if (currentPasswordField) {
        currentPasswordField.addEventListener("input", function() {
            validatePasswordMatch();
        });
    }
});