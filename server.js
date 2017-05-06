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
		process: function(bot,msg,args){
			var videoLink = args[0];
			var options = args.slice(1,args.length);

			const streamOptions = { seek: 0, volume: 1 };
			const broadcast = bot.createVoiceBroadcast();

			var channel = getVoiceChannel(bot, msg);

			channel.join()
				.then(function(connection) {
					const stream = ytdl(videoLink, { filter: 'audioonly'});
					broadcast.playStream(stream);
					const dispatcher = connection.playBroadcast(broadcast);
				})
				.catch(console.error);
		}
	},
	"stop": {
		usage: "!stop",
		description: "Ends playback.",
		process: function(bot,msg,args){
			bot.broadcasts.forEach(function(broadcast){
				broadcast.end();
			})
		}
	}
};

bot.on('ready', function() {
    console.log("Youtube Audio Bot Activated!");
});

bot.on('guildMemberAdd', function(member) {
    member.guild.defaultChannel.send('HEY YOU! ${member}! WELCOME!');
});

bot.on('message', function( message ) {
    parseText(message);
} );

function getVoiceChannel(bot, msg) {
	var userId = msg.author.id;
	var guild = msg.channel.guild;
	return bot.channels.find("id",guild.members.find("id",userId).voiceChannelID);
}

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
	var tokens = command.content.split(" ");
	var cmdTxt = tokens[0].substring(cmdPrefix.length);
	var args = tokens.slice(1,tokens.length);

	var cmd = commands[cmdTxt];
	if(cmd) {
		try{
			cmd.process(bot, command, args);
		} catch(e){
			console.log("cmd " + cmdTxt + " failed! \nStack Trace: \n" + e.stack);
			command.channel.send("command " + cmdTxt + " failed!");
		}
	} else {
		command.channel.send(cmdTxt + " not recognized as a command!").then((message => message.delete(10000)));
	}
}

function parseMessage(message) {
	if(message.content === 'hi')
		message.channel.send('Why hello there');
	else if (message.content === 'what is my avatar?')
		message.reply(message.author.avatarURL);
}


bot.login(token);

