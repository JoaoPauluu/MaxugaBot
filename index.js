//Require 'File System' and 'Discord.js'
const fs = require('fs');
const Discord = require("discord.js");

//Require the array from 'songs.json'
const songs = require('./songs.json');

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
let joinCall = true;


//Function that generates an embed for a help message and returns it SHOULD BE AUTOMATIZED FOR EACH NEW COMMMAND
function helpEmbed() {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Maxuga Commands')
    .setDescription("Todos os comandos do bot Maxuga")
    .setThumbnail('https://i.imgur.com/iAsK7Gb.png')
    .addFields(
      { name: 'maxuga maxuga', value: 'Manda uma linda foto do Maxuga' },
      { name: 'maxuga ednaldo pereira', value: 'Manda uma linda foto do Ednaldo Pereira' },
      { name: 'maxuga on', value: 'Ativa a feature em que o bot segue as pessoas na call (BETA)' },
      { name: 'maxuga off', value: 'Desativa a feature em que o bot segue as pessoas na call (BETA)' },
      { name: 'maxuga meme', value: 'Faz com que o bot entre na call e roda um "meme" aleatório' },
      { name: 'maxuga sussy balls', value: 'Faz com que o bot entre na call e toque "Sussy balls" por Kanye West' },
      { name: 'maxuga help', value: 'Mostra esse menu' },
    )
    .setImage('https://i.imgur.com/iAsK7Gb.png')
    .setFooter('Ajuda / reportar bugs entre em contato com JoaoPauluu#6969');
   return helpEmbed;
}


//Function that picks a random item inside songs array
function pickRandomMusic(min = 0, max = 8) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomPick = Math.floor(Math.random() * (max - min)) + min;
  return songs[randomPick];
};


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
  if (oldMember.member.user.bot) return;
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  if(oldUserChannel === null && joinCall === true) {
    //user joins a channel

    console.log('User joined the channel', newUserChannel);
    //bot join the channel
    const theChannel = client.channels.cache.get(newUserChannel);
    theChannel.join().then(connection => {
        const dispacher = connection.play(pickRandomMusic());
      })
  } else if(newUserChannel === null && joinCall === true){
    //user leaves a channel

    console.log('User left the channel', oldUserChannel);
    //bot leaves the channel
    const theChannel = client.channels.cache.get(oldUserChannel);
    theChannel.leave();
  } else if (newUserChannel !== oldUserChannel && joinCall === true) {
    //user moves channels
    console.log('User moved channels', oldUserChannel, newUserChannel);

    //bot move channels
    const theChannel = client.channels.cache.get(newUserChannel);
    theChannel.join().then(connection => {
        const dispacher = connection.play(pickRandomMusic());
      })
  }
})


client.login(token);
