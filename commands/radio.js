const Discord = require("discord.js");
const internetradio = require('node-internet-radio');
require('events').EventEmitter.prototype._maxListeners = 100;

module.exports.run = async (bot, message, args, prefix) => {
    message.delete(10);
    if (!args[0]) {
        return message.channel.send('Usage : `.radio play {radio number / help}/stop/info`');
    }
    if (args[0].toLowerCase() == "play") {
        if (!args[1]) return message.channel.send('Usage : `.radio play {radio number / help}`');
        if (args[1] == 'help') {
            let embed = new Discord.RichEmbed()
                .setAuthor(`🎵 **Radio-List** 🎵`)
                .setColor('#fffff')
                .addField('1', 'I♥ Radio', true)
                .addField('2', 'I♥Top 100 Charts', true)
                .addField('3', 'I♥2 Dance', true)
                .addField('4', 'I♥ The Battle', true)
                .addField('5', 'I♥ Dreist', true)
                .addField('6', 'I♥ HipHop Turnup', true)
                .addField('7', 'I♥ Radio&Chill', true)
                .addField('8', 'I♥ Popstars', true)
                .addField('9', 'I♥ The Sun', true)
                .addField('10', 'I♥ Greatest Hits', true)
                .addField('11', 'I♥ Hits History', true)
                .addField('12', 'I♥ Party Hard', true)
                .addField('13', 'I♥ Mashup', true)
                .addField('14', 'I♥ Harder Music', true)
                .addField('15', 'I♥ The DJ', true)
                .addField('16', 'I♥ About:Berlin', true);
            return message.channel.send(embed);
        }
        switch (args[1]) {
            case '1':
                startStream('http://stream01.iloveradio.de/iloveradio1.mp3', message);
                break;
            case '2':
                startStream('http://stream01.iloveradio.de/iloveradio9.mp3', message);
                break;
            case '3':
                startStream('http://stream01.iloveradio.de/iloveradio2.mp3', message);
                break;
            case '4':
                startStream('http://stream01.iloveradio.de/iloveradio3.mp3', message);
                break;
            case '5':
                startStream('http://stream01.iloveradio.de/iloveradio6.mp3', message);
                break;
            case '6':
                startStream('http://stream01.iloveradio.de/iloveradio13.mp3', message);
                break;
            case '7':
                startStream('http://stream01.iloveradio.de/iloveradio10.mp3', message);
                break;
            case '8':
                startStream('http://stream01.iloveradio.de/iloveradio11.mp3', message);
                break;
            case '9':
                startStream('http://stream01.iloveradio.de/iloveradio15.mp3', message);
                break;
            case '10':
                startStream('http://stream01.iloveradio.de/iloveradio16.mp3', message);
                break;
            case '11':
                startStream('http://stream01.iloveradio.de/iloveradio12.mp3', message);
                break;
            case '12':
                startStream('http://stream01.iloveradio.de/iloveradio14.mp3', message);
                break;
            case '13':
                startStream('http://stream01.iloveradio.de/iloveradio5.mp3', message);
                break;
            case '14':
                startStream('http://stream01.iloveradio.de/iloveradio17.mp3', message);
                break;
            case '15':
                startStream('http://stream01.iloveradio.de/iloveradio4.mp3', message);
                break;
            case '16':
                startStream('http://stream01.iloveradio.de/iloveradio7.mp3', message);
                break;
            default:
                return message.channel.send('Usage : `.radio play {radio number / help}`');
        }
        return;
    }
    if (args[0].toLowerCase() == "stop") {

        try {
            return message.guild.voiceConnection.channel.leave();
        } catch (err) {
            console.log(message.guild.voiceConnection);
            if (message.guild.voiceConnection == null) {
                return message.channel.send('How should it be possible to leave a channel where I\'m not in?');
            } else {
                return message.channel.send('Something went wrong!');
            }
        }

    }
    return message.channel.send('Usage : `.radio play {radio number / help}/stop/info`');


    function startStream(url, message) {
        if (!url) return;
        if (!message) return;
        if (message.guild.voiceConnection != 'null') {
            //console.log(message.guild.voiceConnection)
            message.member.voiceChannel.leave();
        }
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playStream(url);
                    internetradio.getStationInfo(url, function (error, station) {
                        let radio = station.headers["icy-name"];
                        if (radio == 'backup') radio = 'I Love Radio - Charts & Hits by iloveradio.de';
                        let title = station.title;
                        let track = title.split("-");
                        let trackName = track[1];
                        let trackAuthor = track[0];
                        let embed = new Discord.RichEmbed()
                            .setAuthor(`🎵 Now playing : ${radio} 🎵`)
                            .setColor('FF0000')
                            .setDescription(`
                \`🎵\` **Song name :**  \`${trackName}\`
                \`🎤\` **Author(s) :**  \`${trackAuthor}\`
                `);
                        return message.channel.send(embed);
                    });

                    dispatcher.on("end", end => {
                        return message.guild.voiceConnection.channel.leave();
                    });
                })
                .catch(console.log);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }

};

module.exports.help = {
    name: "radio"
};