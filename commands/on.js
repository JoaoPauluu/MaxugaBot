const mongoUtil = require('../scripts/mongoUtil.js');


module.exports = {
	name: 'on',
	description: 'Disable the feature that makes the bot follow users in voice channels',
	async execute(message, args) {
		const query = { id: `${message.guild.id}`};
		const collection = await mongoUtil.getCol('servers');
		const searchResult = await collection.findOne(query);
		if(!searchResult) {
			await collection.insertOne({ id: `${message.guild.id}`, chase: false});
			message.guild.me.setNickname('Maxuga [ON]');
			message.channel.send('Agora ESTOU seguindo os outros nas chamadas');
		} else
		if(searchResult.chase == false) {
			await collection.updateOne(query, {
				$set: {
					chase: true
				}
			})
			message.guild.me.setNickname('Maxuga [ON]');
			message.channel.send('Agora ESTOU seguindo os outros nas chamadas');
		} else
		if(searchResult.chase == true) {
			message.channel.send('Já estou habilitado');
		} else {
			console.log(searchResult);
			message.channel.send('Algo deu errado');
		}
	},
};



/*
module.exports = {
	name: 'on',
	description: 'Enable the feature that makes the bot follow users in voice channels',
	execute(message, args) {
		message.guild.me.setNickname('Maxuga [ON]');
        message.channel.send('Agora estou seguindo os outros nas chamadas');
        joinCall = true;
	},
};
*/