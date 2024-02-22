const TelegramBot = require('node-telegram-bot-api');
const { generarFraseAleatoria } = require('./bd/phraseGenerator');
const { ImageGeneratorLogic } = require('./imageGenerator');
const express = require('express')
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

bot.onText(/Frase Aleatoria|Frase Personalizada/, (msg, match) => {
  const chatId = msg.chat.id;
  const option = match[0];
  console.log(option);
  if (option === 'Frase Aleatoria') {
     frase = generarFraseAleatoria();
    bot.sendMessage(chatId, 'Elige el tipo de estilo de la imagen:', {
      reply_markup: {
        keyboard: [['Estilo_A fantasy-art'], ['Estilo_A anime'], ['Estilo_A pixel-art'], ['Estilo_A digital-art'], ['Estilo_A comic-book'] , ['Estilo_A neon-punk'], ['Estilo_A analog-film']],
        one_time_keyboard: true,
      },
    });
  } else if (option === 'Frase Personalizada') {
    bot.sendMessage(chatId, 'Ingresa tu frase personalizada:');
  }
});

bot.onText(/Estilo_A \w+/, (msg) => {
  const style = msg.text.slice(9)
  const chatId = msg.chat.id;

  ImageGeneratorLogic(frase,style)
    .then(({url,phrase}) => {
      // Enviar la imagen al chat usando la URL
      bot.sendMessage(chatId,phrase)
      bot.sendPhoto(chatId, url)
        .then(() => {
          console.log('Imagen enviada con éxito');
        })
        .catch((error) => {
          console.error('Error al enviar la imagen:', error);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});
bot.onText(/Estilo_P \w+/, (msg) => {
  const style = msg.text.slice(9)
  const chatId = msg.chat.id;
  console.log(frase);
  ImageGeneratorLogic(frase,style)
    .then(({url,phrase}) => {
      // Enviar la imagen al chat usando la URL
      bot.sendMessage(chatId,phrase)
      bot.sendPhoto(chatId, url)
        .then(() => {
          console.log('Imagen enviada con éxito');
        })
        .catch((error) => {
          console.error('Error al enviar la imagen:', error);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});
bot.on('text', (msg) => {
  if (!msg.text.startsWith('/')&& msg.text !== "Frase Aleatoria"&& msg.text !== "Frase Personalizada" && !msg.text.startsWith('Estilo_A') && !msg.text.startsWith('Estilo_P')) {
  const chatId = msg.chat.id;
  frase = msg.text;
  console.log(msg.text);
  bot.sendMessage(chatId, 'Elige el tipo de estilo de la imagen:', {
    reply_markup: {
      keyboard: [['Estilo_P fantasy-art'], ['Estilo_P anime'], ['Estilo_P pixel-art'], ['Estilo_P digital-art'], ['Estilo_P comic-book'] , ['Estilo_P neon-punk'], ['Estilo_P analog-film']],
      one_time_keyboard: true,
    },
  });
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
