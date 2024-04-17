const TelegramBot = require('node-telegram-bot-api');
const { ImageGeneratorLogic } = require('./imageGenerator');
const express = require('express');
const { GeneratePhrase } = require('./bd/AIGenerator');
require('dotenv').config()
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, {polling: true});
bot.onText(/\/generar/, async(msg) => {
  let frase = ""
  try {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, `Usando la potenjia de la NASA para crea eta imagen... 😼`);
    frase = await GeneratePhrase("google/flan-t5-large");
    if (frase.error){
      frase = await GeneratePhrase("google/flan-t5-base");
    }
    const buffer = await ImageGeneratorLogic(frase);
    await bot.sendMessage(chatId, frase);
    await bot.sendPhoto(chatId, buffer);
    console.log('Imagen enviada con éxito');
  } catch (error) {
    await bot.sendMessage(chatId, `'Error al enviar la imagen:', ${error}`);
    console.error('Error al enviar la imagen:', error);
  }
});

  bot.on('text', async (msg) => {
    if (!msg.text.startsWith('/')) {
      try {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, `Usando la potenjia de la NASA para crea eta imagen... 😼`);
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
