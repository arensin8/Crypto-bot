const { Telegraf } = require("telegraf");
require("dotenv").config();
const bot = new Telegraf(process.env.CRYPYO_TOKEN);

bot.command("crypto", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Please choose one of the crypto's above",
    {
      reply_to_message: ctx.message.message_id,
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

bot.action("one", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("You clicked on the one");
});

bot.action("two", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("You clicked on the two");
});

bot.action("three", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("You clicked on the three");
});

bot.action("four", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("You clicked on the four");
});

bot.action("five", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("You clicked on the five");
});

bot.launch();
