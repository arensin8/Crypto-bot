const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("crypto", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Please choose one of the crypto's above",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "one", callback_data: "one" },
            { text: "two", callback_data: "two" },
          ],
          [
            { text: "three", callback_data: "three" },
            { text: "four", callback_data: "four" },
          ],
          [{ text: "five", callback_data: "five" }],
        ],
      },
    }
  );
});

bot.launch();
