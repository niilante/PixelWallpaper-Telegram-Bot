const Telegraf = require('telegraf');
const axios = require('axios');
const request = require("request-promise");
const cheerio = require("cheerio");
const Bot_Token = "YOUR BOT TOKEN";

const app = new Telegraf(Bot_Token);
app.start((ctx) => ctx.reply(`Welcome ${ctx.message.from.username} Search images from here`));

app.on("text",ctx=>{
     const string = ctx.message.text;
     const url = {
          uri : `https://www.pexels.com/search/${string}`,
          transform: function (body) {
               return cheerio.load(body);
           }
     }
     request(url)
          .then(($)=>{
               if($(".js-photo-link").length>0){
                    let link = $(".js-photo-link").next();
                         Array.from(link).map(x=>
                              ctx.replyWithPhoto(x.attribs.href))
               }else{
                    ctx.reply("Sorry Image Not Found");
               }
          }).catch(e=>ctx.from);
});
app.startPolling();

