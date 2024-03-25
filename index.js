const TelegramBot = require('node-telegram-bot-api');
const { ImageGeneratorLogic } = require('./imageGenerator');
const express = require('express');
const { GeneratePhrase } = require('./bd/AIGenerator');
require('dotenv').config()
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
let frase = ""
bot.onText(/\/generar/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '¿Quieres generar una frase aleatoria o introducir una frase personalizada?', {
    reply_markup: {
      keyboard: [['Frase Aleatoria'], ['Frase Personalizada']],
      one_time_keyboard: true,
    },
  });
});

bot.onText(/Frase Aleatoria|Frase Personalizada/, async (msg, match) => {
  const chatId = msg.chat.id;
  const option = match[0];
  if (option === 'Frase Aleatoria') {
    frase = await GeneratePhrase();
    try {
      const chatId = msg.chat.id;
      const buffer = await ImageGeneratorLogic(frase);
      await bot.sendMessage(chatId, frase);
      await bot.sendPhoto(chatId, buffer);
      console.log('Imagen enviada con éxito');
    } catch (error) {
      console.error('Error al enviar la imagen:', error);
    }
  } else if (option === 'Frase Personalizada') {
    bot.sendMessage(chatId, 'Ingresa tu frase personalizada:');
  }
});
  bot.on('text', async (msg) => {
    if (!msg.text.startsWith('/')&& msg.text !== "Frase Aleatoria"&& msg.text !== "Frase Personalizada" && !msg.text.startsWith('Estilo_A') && !msg.text.startsWith('Estilo_P')) {
      try {
        const chatId = msg.chat.id;
        const buffer = await ImageGeneratorLogic("A drawing of" +msg.text);
        await bot.sendMessage(chatId, msg.text);
        await bot.sendPhoto(chatId, buffer);
        console.log('Imagen enviada con éxito');
      } catch (error) {
        console.error('Error al enviar la imagen:', error);
      }
    }
  });
const app = express()
const port = process.env.PORT || 4000
app.get('/', (req, res) => {
  res.status(200).send('Bot funcionando correctamente')
})

app.listen(port, () => {
  console.log(`App corriendo en el puerto ${port}`)
})
