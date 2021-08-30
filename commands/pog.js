const embeds = require('../scripts/embed.js');

module.exports = {
	name: 'pog',
	description: 'Pog',
	execute(message, args) {
		message.channel.send(embeds.simpleEmbed(`<@${message.author.id}> Pog`));
	},
};