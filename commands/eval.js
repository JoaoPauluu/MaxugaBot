const embeds = require('../scripts/embed.js');

module.exports = {
	name: 'eval',
	description: 'Runs a string given by the user (bot owner only)',
	execute(message, args) {
		if(message.author.id !== '758328146377834549') {
			message.channel.send(embeds.simpleEmbed(`<@${message.author.id}> Esse comando só funciona para o dono do bot`));
			return;
		} else {
			fullArg = '';
			args.forEach(singleArg => {
				fullArg = fullArg + ' ' + singleArg;
			})
			message.delete();
			eval(fullArg);
		}
	},
};