//const helpEmbed = require('../embeds/help.js');

module.exports = {
	name: 'help',
	description: 'Send a help message',
	execute(message, args) {
        message.channel.send(helpEmbed());
	},
};