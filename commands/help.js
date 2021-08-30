const funcs = require('../scripts/functions.js');
const embeds = require('../scripts/embed.js');

module.exports = {
	name: 'help',
	description: 'Send a help message',
	execute(message, args) {
        message.channel.send(embeds.helpEmbed());
	},
};