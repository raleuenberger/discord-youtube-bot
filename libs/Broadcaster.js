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
*/

const ytdl = require('ytdl-core');

class Broadcaster {
    constructor(){
    }

    Play(bot, channel, url){
        const broadcast = bot.Client.createVoiceBroadcast();

        channel.join()
            .then(function(connection) {
                const stream = ytdl(url, { filter: 'audioonly'});
                broadcast.playStream(stream);
                const dispatcher = connection.playBroadcast(broadcast);
            })
            .catch(console.error);
    }
}

module.exports = Broadcaster;