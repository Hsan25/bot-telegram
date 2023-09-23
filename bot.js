
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { Input } = require("telegraf/types");

const fs = require('fs');
require("dotenv").config();

const bot_token = process.env.BOT_TOKEN;

const bot = new Telegraf(bot_token);

const data = ["moon", "sun", "sky"];
bot.start((ctx) => {
  const context = ctx.update.message;


  const name = context.from.username;

  console.log(ctx);
  ctx.reply(`Selamat datang ${name} di BOT kami`);
});

bot.command('img',(ctx) => {
  const imageStream = fs.createReadStream('img/1.png');
  ctx.replyWithPhoto({ source: imageStream });
});
//


bot.command("menu", (ctx) => {
  const str = `SELAMAT DATANG DI MENU KAMI!!!
    APA YANG BISA KAMI LAKUKAN
    [1] tampilkan data
    [2] ubah data
    [3] tambah data
    [4] cari data
    [5] hapus data
    
    silahkan masukkan angka untuk melakukan sesuatu`;

  ctx.reply(str);
});

bot.hears("1", (ctx) => {
  let str = "Data yang tersimpan\n";
  console.log(data);
  data.forEach((item, index) => {
    // let template =
    let inde = index + 1;
    str += `${inde}. ${item} \n`;
  });
  ctx.reply(str);
});



bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


console.log(__dirname,__filename);
