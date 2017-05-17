/**
 * Created by Robert Leuenberger on 5/8/2017.
 */

const Commands = {
    "play": {
        Usage: "!play <youtube_url> [voice_channel]",
        Description: "Plays a youtube link for a voice channel; if no voice channel is specified, it will default to the 'general' channel",
        Process: function(bot, command){
            var url = command.Parameters[0];
            bot.BroadcastYoutubeAudio(command.Author, command.Channel, url);
        }
    },
    "stop": {
        Usage: "!stop",
        Description: "Ends playback for the current broadcast.",
        Process: function(bot, command){
			bot.StopBroadcast();
        }
    },
    "leave": {
        Usage: "!leave",
        Description: "Forces the bot to leave the current voice channel.",
        Process: function(bot, command){
			bot.LeaveVoiceChannel();
        }
    },
    "help": {
        Usage: "!help",
        Description: "Lists all possible commands.",
        Process: function(bot, command){
            bot.ListAllCommands(command.Channel);
        }
    },
	"playlist": {
		Usage: "!playlist <playlist_name> [action: create, add, remove, play, songs] [option 1: url, id, loop/shuffle] [option 2: loop/shuffle]",
		Description: "Modify (create, add, remove) and play (straight-through, shuffle) playlists.",
		Process: function(bot, command){
			bot.HandlePlaylistCommand(command);
		}
	},
	"pl": {
		Usage: "!pl <playlist_name> [action: create, add, remove, play, songs] [option 1: url, id, loop/shuffle] [option 2: loop/shuffle]",
		Description: "Shorthand analog of !playlist command.",
		Process: function(bot, command){
			bot.HandlePlaylistCommand(command);
		}
	},
	"playlists": {
		Usage: "!playlists",
		Description: "Lists all existing playlists.",
		Process: function(bot, command){
			bot.ListAllPlaylists(command.Channel);
		}
	},
	"pls": {
		Usage: "!pls",
		Description: "Shorthand analog of !playlists, with bonus politeness.",
		Process: function(bot, command){
			bot.ListAllPlaylists(command.Channel);
		}
	}
};

module.exports = Commands;