module.exports = {
	name: 'off',
	description: 'Disable the feature that makes the bot follow users in voice channels',
	execute(message, args) {
		message.guild.me.setNickname('Maxuga [OFF]');
        message.channel.send('Agora não estou mais seguindo os outros nas chamadas');
        joinCall = false;
	},
};