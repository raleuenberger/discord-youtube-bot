/**
 * Created by Robert Leuenberger on 4/28/2017.
 */

const Discord = require('discord.js');

const fs = require('fs');
const ytdl = require('ytdl-core');

const client = new Discord.Client();
const token = fs.readFileSync("private/token.txt", "utf8");

client.on('ready', function() {
    console.log("Youtube Audio Bot Activated!")
    //console.log(client.createVoiceBroadcast);

    const streamOptions = { seek: 0, volume: 1 };
    const broadcast = client.createVoiceBroadcast();

    var channel = client.channels.find('name', 'General');

    channel.join()
     .then(function(connection) {
         const stream = ytdl('https://www.youtube.com/watch?v=SW-BU6keEUw', { filter: 'audioonly'});
         broadcast.playStream(stream);
         const dispatcher = connection.playBroadcast(broadcast);
     })
     .catch(console.error);
});

client.on('guildMemberAdd', function(member) {
    member.guild.defaultChannel.send('HEY YOU! ${member}! WELCOME!');
});

client.on('message', function(message) {
    if (message.content === "!play" && message.author.bot != true)
    {
        //client.joinVoiceChannel('general').catch(error);
    }

    if (message === 'hi');
        message.channel.send('Howdy Cowboy!');

    if (message.content === 'what is my avatar?') {
        // Send the user's avatar URL
        //message.reply(message.author.avatarURL);
        message.author.send(message.author.avatarURL);
    }
});

client.login(token);

