const Discord = require("discord.js");
const internetradio = require('node-internet-radio');

module.exports.run = async (bot, message, args, prefix) => {
    var channel = "undefined";
    if (!args[0]) {
        return message.channel.send('Usage : `.radio play/stop/info`');
    };
    if (args[0].toLowerCase() == "play") {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    channel = message.member.voiceChannel;
                    const dispatcher = connection.playStream('http://streams.bigfm.de/nitroxedmilr-128-mp3'); //http://stream01.iloveradio.de/iloveradio1.mp3
                    let stream = "http://streams.bigfm.de/nitroxedmilr-128-mp3";
                    internetradio.getStationInfo(stream, function (error, station) {
                        let radio = station.headers["icy-name"];
                        let title = station.title;
                        let track = title.split("-");
                        let trackName = track[1];
                        let trackAuthor = track[0];
                        let embed = new Discord.RichEmbed()
                            .setAuthor(`🎵 Now playing : **${radio}** 🎵`)
                            .setColor('FF0000')
                            .setDescription(`
                \`🎵\` **Song name :**  \`${trackName}\`
                \`🎤\` **Author(s) :**  \`${trackAuthor}\`
                `);
                        return message.channel.send(embed);
                    });
                    message.delete(10);
                    dispatcher.on("end", end => {
                        message.member.voiceChannel.leave();
                    });
                })
                .catch(console.log);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
    if (args[0].toLowerCase() == "stop") {
        try {
            return message.member.voiceChannel.leave();
        } catch (err) {
            message.channel.send("Oops!");
        }

    }
    if (args[0].toLowerCase() == "info") {
        let stream = "http://streams.bigfm.de/nitroxedmilr-128-mp3";
        internetradio.getStationInfo(stream, function (error, station) {
            let radio = station.headers["icy-name"];
            let title = station.title;
            let track = title.split("-");
            let trackName = track[1];
            let trackAuthor = track[0];
            if (channel != "undefined") {
                let embed = new Discord.RichEmbed()
                    .setAuthor(`❌ **Not Playing** ❌`)
                    .setColor('FF0000');
                return message.channel.send(embed);
            }

            let embed = new Discord.RichEmbed()
                .setAuthor(`🎵 **${radio}** 🎵`)
                .setColor('FF0000')
                .setDescription(`
                \`🎵\` **Song name :**  \`${trackName}\`
                \`🎤\` **Author(s) :**  \`${trackAuthor}\`
                `);
            return message.channel.send(embed);
        });
    }

};

module.exports.help = {
    name: "radio"
};