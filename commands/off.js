const mongoUtil = require('../scripts/mongoUtil.js');


module.exports = {
	name: 'off',
	description: 'Disable the feature that makes the bot follow users in voice channels',
	async execute(message, args) {
		const query = { id: `${message.guild.id}`};
		const collection = await mongoUtil.getCol('servers');
		const searchResult = await collection.findOne(query);
		if(!searchResult) {
			await collection.insertOne({ id: `${message.guild.id}`, chase: false});
			message.guild.me.setNickname('Maxuga [OFF]');
			message.channel.send('Agora NÃO ESTOU seguindo os outros nas chamadas');
		} else
		if(searchResult.chase == true) {
			await collection.updateOne(query, {
				$set: {
					chase: false
				}
			})
			message.guild.me.setNickname('Maxuga [OFF]');
			message.channel.send('Agora NÃO ESTOU seguindo os outros nas chamadas');
		} else
		if(searchResult.chase == false) {
			message.channel.send('Já estou desabilitado');
		} else {
			message.channel.send('Algo deu errado');
			console.log(searchResult);
		}
	}
};





/*
module.exports = {
	name: 'off',
	description: 'Disable the feature that makes the bot follow users in voice channels',
	execute(message, args) {
		message.guild.me.setNickname('Maxuga [OFF]');
        message.channel.send('Agora não estou mais seguindo os outros nas chamadas');
        joinCall = false;
	},
};
*/