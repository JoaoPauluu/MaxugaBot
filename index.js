const Discord = require("discord.js");
const songs = require('./songs.json');
const client = new Discord.Client();
const disbut = require('discord-buttons')(client);
const prefix = "maxuga";
const token = process.env.BOT_TOKEN;

let joinCall = true;

const botCommands = {
  maxuga: (message) => {
    message.channel.send('https://i.imgur.com/iAsK7Gb.png')},
  "ednaldo pereira": (message) =>{message.channel.send('https://i.imgur.com/Lajk9AM.png')},
  pog: (message) => {message.channel.send('Pog')},
  help: (message) => {message.channel.send(embedFunction())},
  meme: async (message) => {
    const connection = await message.member.voice.channel.join();
    const dispacher = connection.play(pickRandomMusic())},
  "sussy balls": async (message) => {
    const connection = await message.member.voice.channel.join();
    const dispacher = connection.play(songs[7])},
  on: async (message) => {
    await message.guild.me.setNickname('Maxuga [ON]');
    message.channel.send('Agora estou seguindo os outros nas chamadas');
    joinCall = true},
  off: async (message) => {
    await message.guild.me.setNickname('Maxuga [OFF]');
    message.channel.send('Agora não estou mais seguindo os outros nas chamadas');
    joinCall = false}
};



const embedFunction = () => {
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



function pickRandomMusic(min = 0, max = 8) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomPick = Math.floor(Math.random() * (max - min)) + min;
  return songs[randomPick];
}

client.once("ready", () => {
  console.log("Ready!");
  client.user.setPresence({
    status: 'online',
    activity: {
      name: 'maxuga help',
      type: 'PLAYING'
    }
  })
  let clientGuilds = client.guilds;
  console.log(clientGuilds);
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

//All chat commands

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const messageShort = message.content.substring(prefix.length).trim();
 // console.log(messageShort); //debugging only, remove later
  if (botCommands[messageShort]) {
    botCommands[messageShort](message);
  } else message.channel.send('Infelizmente esse comando não existe :(');
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
