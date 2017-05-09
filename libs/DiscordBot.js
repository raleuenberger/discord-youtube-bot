/**
 * Created by Robert Leuenberger on 5/8/2017.
 */

const fs = require('fs');
const Discord = require('discord.js');

const Broadcaster = require('../libs/Broadcaster.js');

class DiscordBot {
    constructor(prefix, parser, commands){
        this.Client = new Discord.Client();

        this.BotPrefix = prefix;
        this.Parser = parser;
        this.Commands = commands;
        this.Broadcaster = new Broadcaster();

        this.Client.on('ready', () => this.Ready());
        this.Client.on('guildMemberAdd', (member) => this.NewServerMember(member));
        this.Client.on('message', (message) => this.HandleMessage(message));
    }

    Login(tokenPath){
        const token = fs.readFileSync(tokenPath, "utf8");
        this.Client.login(token);
    }

    Ready(){
        console.log('Dat Cat activated!');
    }

    NewServerMember(member){
        member.guild.defaultChannel.send('Hi ' + member + '! Welcome to the server.');
    }

    HandleMessage(message){
        if(!this.IsBotMessage(message) && this.IsCommandMessage(message)){
            var command = this.Parser.ParseCommand(this.BotPrefix, message);
            this.Commands[command.Name].Process(this, command);
            message.delete(10000)
                .then(msg => console.log('Deleted message from ' + msg.author))
                .catch(console.error);
        }
    }

    IsBotMessage(message){
        return message.author.bot;
    }

    IsCommandMessage(message){
        return message.content.startsWith(this.BotPrefix);
    }

    DetermineUsersVoiceChannel(author, channel){
        return this.Client.channels.find("id", channel.guild.members.find("id", author.id).voiceChannelID);
    }

    BroadcastYoutubeAudio(author, channel, url){
        var voiceChannel = this.DetermineUsersVoiceChannel(author, channel);
        this.Broadcaster.Play(this, voiceChannel, url);
    }

    ListAllCommands(channel){
        var helpString = "Hello, here are the commands I can perform: \n \n";

        Object.entries(this.Commands).forEach(function([key, value]){
            helpString += value.Usage + "\n";
            helpString += value.Description + "\n\n";
        });

        channel.send(helpString).then((message => message.delete(30000)));
    }
}

module.exports = DiscordBot;