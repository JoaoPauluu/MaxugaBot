module.exports = {
	name: 'on',
	description: 'Enable the feature that makes the bot follow users in voice channels',
	execute(message, args) {
		message.guild.me.setNickname('Maxuga [ON]');
        message.channel.send('Agora estou seguindo os outros nas chamadas');
        joinCall = true;
	},
};