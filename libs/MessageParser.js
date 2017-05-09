/**
 * Created by Robert Leuenberger on 5/8/2017.
 */

const Command = require('../libs/Command.js');

class MessageParser {
    constructor(){
    }

    ParseCommand(prefix, message){
        var tokens = message.content.split(" ");

        var commandName = tokens[0].substring(prefix.length);
        var commandParams = tokens.slice(1, tokens.length);
        var commandAuthor = message.author;
        var commandChannel = message.channel;

        return new Command(commandName, commandAuthor, commandChannel, commandParams);
    }
}

module.exports = MessageParser;