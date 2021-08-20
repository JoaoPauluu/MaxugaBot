const funcs = require('../scripts/functions.js');
const songs = require('../scripts/songs.json')

module.exports = {
	name: 'sussyballs',
	description: 'Plays Sussy Balls from Kanye West',
	async execute(message, args) {
		const connection = await message.member.voice.channel.join();
    	const dispacher = connection.play(songs[7]);
	},
};