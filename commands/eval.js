module.exports = {
	name: 'eval',
	description: 'Runs a string given by the user (bot owner only)',
	execute(message, args) {
		if(message.author.id !== '758328146377834549') {
			message.channel.send('Esse comando só funciona para o dono do bot');
			return;
		} else {
			fullArg = '';
			args.forEach(singleArg => {
				fullArg = fullArg + ' ' + singleArg;
			})
			eval(fullArg);
		}
	},
};