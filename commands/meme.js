const funcs = require('../scripts/functions.js');
const embeds = require('../scripts/embed.js');

module.exports = {
	name: 'meme',
	description: 'Runs a random song',
	async execute(message, args) {
		const randomMusic = funcs.pickRandomMusic();
		const embedDescription = `<@${message.author.id}> Agora tocando ${randomMusic}`
		const connection = await message.member.voice.channel.join();
		const dispacher = connection.play(randomMusic);
		message.channel.send(embeds.titleEmbed('Maxuga meme', embedDescription));
	},
};