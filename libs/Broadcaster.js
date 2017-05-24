/**
 * Created by Robert Leuenberger on 5/8/2017.
 */

/*
    TODO:
    Add music queuing system
    Add pausing / resuming / restarting functionality
    Shuffle queue
    Reset queue
    Clear queue
    Jump to in queue etc
	
	Migrate Playlist storage to a Database class that utilizes lowdb and lodash-id
	: https://github.com/typicode/lodash-id
	: # with lowdb
	: # npm install lowdb lodash-id --save

*/

const ytdl = require('ytdl-core');

class Broadcaster {
    constructor(){
		this.Playlists = {};
		this.IsPlayingPlaylist = false;
		this.IsLoopingPlaylist = false;
		
		this.Tracklist = [];
		this.TracklistIndex = null;
		
		this.VoiceChannel = null;
		this.TextChannel = null;
		
		this.Connection = null;
		this.Broadcast = null;
		this.Stream = null;
    }

	JoinChannel(channel){
	    var self = this;
        return new Promise((resolve) => {
            channel.join()
                .then(function(connection) {
                    self.Connection = connection;
                    resolve();
                });
        });
	}
	
	/*
		Decide whether or not 'bot' needs to be passed in to this function (find a way to avoid!)
		Reduce Play to the bare minimum inputs: url
		Move bot, voiceChannel, textChannel, to a BroadcastInitialize function of some sort.
	*/
    Play(bot, voiceChannel, textChannel, url){
		this.Broadcast = bot.Client.createVoiceBroadcast();
		this.VoiceChannel = voiceChannel;
		this.TextChannel = textChannel;

        var self = this;
		this.JoinChannel(this.VoiceChannel)
            .then(function() {
                self.PlaySong(url);
            })
            .catch(console.error);
    }
	
	PlaySong(url){
	    console.log("now i'm here: " + url);
		this.Stream = ytdl(url, { filter: 'audioonly'});
		this.Broadcast.playStream(this.Stream);
		const dispatcher = this.Connection.playBroadcast(this.Broadcast);
		
        this.Stream.on('finish', () => this.BroadcastFinished());
	}
	
	CreatePlaylist(playlistName, author){
		if(this.Playlists[playlistName] != null){
			TextChannel.send("The playlist " + playlistName + " already exists.").then((message => message.delete(30000)));
		}
		else{
			Playlists[playlistName] = {
				name: playlistName,
				creators: [author.username],
				tracks: []
			};
		}
	}
	
	AddSongToPlaylist(playlistName, author, url){
		if(this.Playlists[playlistName] == null){
			TextChannel.send("The playlist " + playlistName + " does not exist.").then((message => message.delete(30000)));
		}
		else{
			var playlist = Playlists[playlistName];
			playlist.tracks.push(url);
			if(playlist.creators.indexOf(author.username) < 0) {
				playlist.creators.push(author.username);
			}
		}
	}
	
	StartPlaylist(playlistName, looping, shuffled){
		if(this.Playlists[playlistName] == null){
			TextChannel.send("The playlist " + playlistName + " does not exist.").then((message => message.delete(30000)));
		}
		else{
			var playlist = Playlists[playlistName];
			var tracks = playlist.tracks.slice(0);
			
			if(shuffled){
				tracks = ShuffleTracks(tracks);
			}
			
			this.Tracklist = tracks;
			this.IsLoopingPlaylist = looping;
			this.IsPlayingPlaylist = true;
		}
	}
	
	ShuffleTracks(tracks){
		for(var i = tracks.length - 1; i > 0; i--){
			var j = Math.floor(Math.random() * (i + 1));
			var temp = tracks[i];
			tracks[i] = tracks[j];
			tracks[j] = temp;
		}
		return tracks;
	}
	
	BroadcastFinished(){
		/*
		 Handle moving to the next song if a Playlist is playing and not at the last song,
		 if it is at the last song, and is looping, loop back to the first song
		 if shuffled, randomly select another track (other than the one that just played) and play that
		*/
	}
}

module.exports = Broadcaster;