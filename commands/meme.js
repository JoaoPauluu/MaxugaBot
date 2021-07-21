module.exports = {
	name: 'meme',
	description: 'Runs a random song',
	execute(message, args) {
		const connection = message.member.voice.channel.join();
		const dispacher = connection.play(pickRandomMusic());
	},
};