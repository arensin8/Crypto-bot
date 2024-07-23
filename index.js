const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);
const cryptoToken = process.env.CRYPYO_TOKEN;
const apiURL =
  "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR";

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
            { text: "BTC", callback_data: "BTC" },
            { text: "ETH", callback_data: "ETH" },
          ],
          [
            { text: "USDT", callback_data: "USDT" },
            { text: "BUSD", callback_data: "BUSD" },
          ],
          [
            { text: "SOL", callback_data: "SOL" },
            { text: "XRP", callback_data: "XRP" },
          ],
          [
            { text: "DOGE", callback_data: "DOGE" },
            { text: "BNB", callback_data: "BNB" },
          ],
          [
            { text: "PEPE", callback_data: "PEPE" },
            { text: "ADA", callback_data: "ADA" },
          ],
          [
            { text: "DOT", callback_data: "DOT" },
            { text: "AVAX", callback_data: "AVAX" },
          ],
          [{ text: "main menu", callback_data: "mainmenu" }],
        ],
      },
    }
  );
});

bot.action(
  [
    "BTC",
    "BUSD",
    "USDT",
    "ETH",
    "SOL",
    "XRP",
    "DOGE",
    "BNB",
    "PEPE",
    "ADA",
    "DOT",
    "AVAX",
  ],
  async (ctx) => {
    try {
      const apiURL = `https://min-api.cryptocompare.com/data/price?fsym=${ctx.match}&tsyms=USD&api_key=${cryptoToken}`;
      const data = await axios.get(apiURL).then((res) => res.data);
      ctx.reply(
        `${ctx.match} price is : ${Object.values(data)[0]} ${
          Object.keys(data)[0]
        }`
      );
    } catch (error) {
      ctx.reply(error.message);
    }
    ctx.answerCbQuery();
  }
);

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
