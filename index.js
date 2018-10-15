

const config = require("./config/bot.json"); 
const Discord = require("discord.js"); 
const fs = require("fs"); 

const bot = new Discord.Client();
bot.commands = new Discord.Collection();


bot.on('message', message => { 

    if (message.author.id === bot.user.id) return;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return message.channel.send("I don't anwser in this chat!");

    let prefixes = JSON.parse(fs.readFileSync("./config/prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.bot.prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let botid = bot.user.id;

    let mbot = message.guild.members.get(botid);

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    let commandFile = bot.commands.get(cmd.slice(prefix.length));

    if (commandFile) commandFile.run(bot, message, args, prefix);


});