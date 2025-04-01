function doPost(e) {
    //Capturar contenido del Webhook recibido
    var operation = JSON.parse(e.postData.contents);
    var messageData = operation.entry[0].changes[0].value.messages[0];
    //Extraer información del contenido que nos será de utilidad para el prosamiento o lógica de conversación.
    var recipientNumber = messageData.from;
    var messageType = messageData.type;
    var message_id = messageData.id;
    //Regresar respuesta de status 200 a Meta
    return ContentService.createTextOutput("200");
}