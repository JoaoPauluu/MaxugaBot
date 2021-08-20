const fs = require('fs');
const Discord = require("discord.js");
const funcs = require('./scripts/functions.js');
const callevents = require('./scripts/callevents.js');

//Creates a new Discord.client
const client = new Discord.Client();

//Require 'discord-buttons'
const disbut = require('discord-buttons')(client);

//Create a new commands map inside the client object
client.commands = new Discord.Collection();

//Save all files ending with '.js' inside /commands inside an array
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//Creates a new object inside client.commands map for each item in the commandFiles array
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands.get('help').execute.toString());

//Defines the default prefix and token for the bot
const prefix = "maxuga";
const token = process.env.BOT_TOKEN;

//Variable that can be switched to define if the bot is gonna follow users or not SOON TO BE DEPRECATED
letjoinCall = true;


client.once("ready", () => {
  //Code that will run when the bot starts
  console.log("Ready!");
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'maxuga help',
      type: 'PLAYING'
    }
  })
  //let clientGuilds = client.guilds;
  //console.log(clientGuilds);
});

client.once("reconnecting", () => {
  //Code that will run if the bot is reconnecting
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  //Code that will run if the bot got disconnected
  console.log("Disconnect!");
});

//All chat commands

client.on("message", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  //args has all the words (separated by space) typed by the user inside an array except for the prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  //comman has only the first word typed by the user after the prefix
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) {
    message.channel.send('Esse comando não existe :(');
    return;
  }

  //  Tries to run the command requested by the user. If it detects an error the error
  //  Will be logged to the console and send in my dm and in the channel that the command was typed
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
