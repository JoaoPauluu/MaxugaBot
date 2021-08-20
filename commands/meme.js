const funcs = require('../scripts/functions.js');

module.exports = {
	name: 'meme',
	description: 'Runs a random song',
	async execute(message, args) {
		const connection = await message.member.voice.channel.join();
		const dispacher = connection.play(funcs.pickRandomMusic());
	},
};