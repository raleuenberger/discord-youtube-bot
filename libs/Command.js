/**
 * Created by Robert Leuenberger on 5/8/2017.
 */

class Command {
    constructor(name, author, channel, params){
        this.Name = name;
        this.Author = author;
        this.Channel = channel;
        this.Parameters = params;
    }
}

module.exports = Command;