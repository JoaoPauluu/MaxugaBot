const funcs = require('../scripts/functions.js')

module.exports = {
	name: 'help',
	description: 'Send a help message',
	execute(message, args) {
        message.channel.send(funcs.helpEmbed());
	},
};