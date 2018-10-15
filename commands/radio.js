const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {
    
    message.channel.send(`Yes it's working ${message.author}`);

};

module.exports.help = {
    name: "radio"
};