/**
 * Created by Robert Leuenberger on 5/8/2017.
 */

const Commands = {
    "play": {
        Usage: "!play <youtube_url> [voice_channel]",
        Description: "Plays youtube links for a voice channel; if no voice channel is specified, it will default to the 'general' channel",
        Process: function(bot, command){
            var url = command.Parameters[0];
            bot.BroadcastYoutubeAudio(command.Author, command.Channel, url);
        }
    },
    "stop": {
        Usage: "!stop",
        Description: "Ends playback.",
        Process: function(bot, command){
            bot.Client.broadcasts.forEach(function(broadcast){
                broadcast.end();
            })
        }
    },
    "leave": {
        Usage: "!leave",
        Description: "Leaves current voice channel.",
        Process: function(bot, command){
            bot.Client.voiceConnections.forEach(function(connection){
                connection.disconnect();
            })
        }
    },
    "help": {
        Usage: "!help",
        Description: "Lists all possible commands.",
        Process: function(bot, command){
            bot.ListAllCommands(command.Channel);
        }
    }
};

module.exports = Commands;