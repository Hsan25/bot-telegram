const express = require("express");
const { Telegraf } = require("telegraf");
const fs = require("fs");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

const port = 3000;

const webhookDomain = "https://bot-telegram-gilt.vercel.app";
// Set the bot API endpoint
async function start() {
  app.use(await bot.createWebhook({ domain: webhookDomain }));
}
start();

bot.start((ctx) => {
  const context = ctx.update.message;
  const name = context.from.username;
  ctx.reply(`Selamat datang ${name} di BOT kami!!`);
});

bot.command("img", (ctx) => {
  const imageStream = fs.createReadStream(__dirname + "/img/1.png");
  ctx.replyWithPhoto({ source: imageStream });
});

app.listen(port, () => console.log("Listening on port", port));
