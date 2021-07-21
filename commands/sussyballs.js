module.exports = {
	name: 'sussyballs',
	description: 'Plays Sussy Balls from Kenny West',
	execute(message, args) {
		const connection = message.member.voice.channel.join();
    	const dispacher = connection.play(songs[7]);
	},
};