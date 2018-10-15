

const config = require("./config/bot.json"); 
const Discord = require("discord.js"); 
const fs = require("fs"); 

const moment = require("moment");
require("moment-duration-format");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();


