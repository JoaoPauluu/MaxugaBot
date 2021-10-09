//Defines the default prefix, token and database connection for the bot
const prefix = "maxuga";
const token = process.env.BOT_TOKEN;
const uri = process.env.URI;

//Require needed modules
const fs = require('fs');
const { Client, Intents} = require("discord.js");
const funcs = require('./scripts/functions.js');
const callevents = require('./scripts/callEvents.js');
const embeds = require('./scripts/embed.js');


//Creates client
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]});

//Create disbut for discord-buttons
const disbut = require('discord-buttons')(client);

//Connects to database
const mongoUtil = require('./scripts/mongoUtil.js');
mongoUtil.connect();



//Create a map and put each command inside commands folder
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}



//Variable that can be switched to define if the bot is gonna follow users or not SOON TO BE DEPRECATED
letjoinCall = true;

//Actions when the bot connects, disconnectes, and reconnects
const start = require('./scripts/start.js');

client.once("ready", () => {start.ready(client)});
client.once("reconnecting", () => {start.reconnecting()});
client.once("disconnect", () => {start.disconnect()});


//All chat commands

client.on("messageCreate", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //args has all the words (separated by space) typed by the user inside an array except for the prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //comman has only the first word typed by the user after the prefix
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) {
    message.channel.send(embeds.simpleEmbed(`<@${message.author.id}> Esse comando não existe, digite **maxuga help** para uma lista com todos os comandos`));
    return;
  }

  //  Tries to run the command requested by the user. If it detects an error the error
  //  Will be logged to the console and sent in my dm and in the channel that the command was typed
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.log(error);
    client.users.cache.get('758328146377834549').send(error.stack);
    message.channel.send(error.stack);
  }

})

//Checks when a user joins/leaves/moves from a voice channel and runs the code
client.on('voiceStateUpdate', async (oldMember, newMember) => {
  callevents.follower(oldMember, newMember, client);
})


client.login(token);
