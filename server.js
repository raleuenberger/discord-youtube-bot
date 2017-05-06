/**
 * Created by Robert Leuenberger on 4/28/2017.
 */

const Discord = require('discord.js');

const hook = new Discord.WebhookClient('id', 'token');

hook.send('I am now alive!');
