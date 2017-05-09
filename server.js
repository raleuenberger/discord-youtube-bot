/**
 * Created by Robert Leuenberger on 4/28/2017.
 */

const fs = require('fs');
const ytdl = require('ytdl-core');

const DiscordBot = require('./libs/DiscordBot.js');
const MessageParser = require('./libs/MessageParser.js')
const Commands = require('./libs/CommandDict.js');

const Parser = new MessageParser();
const bot = new DiscordBot('!', Parser, Commands);

bot.Login('private/token.txt');