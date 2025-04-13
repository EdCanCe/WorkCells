const axios = require('axios');

const WHATSAPP_API_URL = 'https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';

app.post('/send-message', async (req, res) => {
  const { number, templateName, languageCode, components } = req.body;

  try {
    const response = await axios.post(WHATSAPP_API_URL, {
      messaging_product: 'whatsapp',
      to: number,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode
        },
        components: components
      }
    }, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response.data });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
