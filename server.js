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
});

client.on('guildMemberAdd', function(member) {
    member.guild.defaultChannel.send('HEY YOU! ${member}! WELCOME!');
});

client.on('message', function(message) {
    if(message === 'hi');
        message.channel.send('Howdy Cowboy!');

    if (message.content === 'what is my avatar?') {
        // Send the user's avatar URL
        message.reply(message.author.avatarURL);
    }
});

client.login(token);
