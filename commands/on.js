const mongoUtil = require('../scripts/mongoUtil.js');
const embeds = require('../scripts/embed.js');


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
			message.channel.send(embeds.simpleEmbed(`<@${message.author.id}> Agora ESTOU seguindo os outros nas chamadas`));
		} else
		if(searchResult.chase == false) {
			await collection.updateOne(query, {
				$set: {
					chase: true
				}
			})
			message.guild.me.setNickname('Maxuga [ON]');
			message.channel.send(embeds.simpleEmbed(`<@${message.author.id}> Agora ESTOU seguindo os outros nas chamadas`));
		} else
		if(searchResult.chase == true) {
			message.channel.send(embeds.simpleEmbed(`<@${message.author.id}> Já estou habilitado`));
		} else {
			console.log(searchResult);
			message.channel.send(`<@${message.author.id}> Algo deu errado`);
		}
	},
};

