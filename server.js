/**
 * Created by Robert Leuenberger on 4/28/2017.
 */

const Discord = require('discord.js');

const fs = require('fs');
const ytdl = require('ytdl-core');

const bot = new Discord.Client();
const token = fs.readFileSync("private/token.txt", "utf8");

const cmdPrefix = "!";
const commands = {
	"play": {
		usage: "!play <youtube_url> [voice_channel]",
		description: "Plays youtube links for a voice channel; if no voice channel is specified, it will default to the 'general' channel",
		process: function(bot,args){
			var videoLink = args[0];
			var options = args.slice(1,args.length);
		}
	}
};

bot.on('ready', function() {
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

bot.on('guildMemberAdd', function(member) {
    member.guild.defaultChannel.send('HEY YOU! ${member}! WELCOME!');
});

bot.on('message', function( message ) {
    if( (acceptableMessages.indexOf( message.content ) > -1 ) && !message.author.bot ) {
        message.channel.send( 'Suhhh' );
	}
} );

function isBotMessage(message) {
	return message.author.bot;
}

function isCommandMessage(message) {
	return message.content.startsWith(cmdPrefix);
}

function parseText(text) {
	if(isBotMessage(text)) return;

	if(isCommandMessage(text)) {
		parseBotCommand(text);
	} else {
		parseMessage(text);
	}
}

function parseBotCommand(command) {
	var tokens = command.split(" ");
	var cmd = tokens[0].substring(cmdPrefix.length);
	var args = tokens.slice(1,tokens.length);


}

function parseMessage(message) {
	
}


client.login(token);

