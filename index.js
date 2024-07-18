const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const cryptoToken = process.env.CRYPYO_TOKEN;

bot.command("crypto", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Main menu", {
    reply_to_message: ctx.message.message_id,
    reply_markup: {
      inline_keyboard: [
        [{ text: "Crypto price's", callback_data: "pricing" }],
        [
          {
            text: "Coin List (cryptoCompare)",
            url: "https://www.cryptocompare.com/coins/list/all/USD/1",
          },
        ],
      ],
    },
  });
});

bot.action("pricing", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage();
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
          [{ text: "main menu", callback_data: "mainmenu" }],
        ],
      },
    }
  );
});

bot.action("mainmenu", (ctx) => {
  ctx.answerCbQuery();
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, "Main menu", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Crypto price's", callback_data: "pricing" }],
        [
          {
            text: "Coin List (cryptoCompare)",
            url: "https://www.cryptocompare.com/coins/list/all/USD/1",
          },
        ],
      ],
    },
  });
});

bot.launch();
