const axios = require('axios');

/**
 * Función genérica que envía una solicitud POST a la API de WhatsApp .
 * Usa las variables de entorno para configurar la versión, el phone number id y el token.
 * @param {*} data - Datos JSON que se enviarán en la solicitud POST.
 */
function sendMessage(data) {
    const config = {
        method: 'post',
        url: `https://graph.facebook.com/${process.env.WHATSAPP_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
        },
        data: data
    };

    return axios(config);
}

/**
 * Función para enviar un mensaje de plantilla por WhatsApp usando la plantilla "prueba_wc".
 * 
 * @param {string} phoneNumber - El número de destino, obtenido de tu base de datos.
 * @param {string} headerRequest - Valor para la variable "request" que se usa en la cabecera del mensaje.
 * @param {string} employeeName - Nombre del empleado (primer parámetro del cuerpo).
 * @param {string} requestName - Nombre de la solicitud hecha (segundo parámetro del cuerpo).
 * @param {string} status - Estatus de la solicitud (tercer parámetro del cuerpo).
 * @param {string} role - Role que ha aceptado o denegado la solicitud (cuarto parámetro del cuerpo).
 * @return {Promise} - La promesa que se resuelve con el resultado de la solicitud.
**/
function sendTemplateMessage(phoneNumber, employeeName, requestName, status, role) {
    const data = {
        "messaging_product": "whatsapp",
        "to": phoneNumber,
        "type": "template",
        "template": {
            "name": "prueba_wc",
            "language": { "code": 'en' },
            "components": [
                {
                "type": "body",
                "parameters": [
                    { "type": 'text', "parameter_name": "employee_name", "text": employeeName },
                    { "type": 'text', "parameter_name": "request", "text": requestName },
                    { "type": 'text', "parameter_name": "status", "text": status },
                    { "type": 'text', "parameter_name": "role", "text": role }
                ]
                }
        ]
        }
    };

    return sendMessage(data);
}

module.exports = {
    sendTemplateMessage
};