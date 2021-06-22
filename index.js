const Discord = require("discord.js");
const prefix = "maxuga";
const token = process.env.BOT_TOKEN;


const client = new Discord.Client();
const songs = require('./songs.json');
let joinCall = true

function pickRandomMusic(min = 0, max = 8) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomPick = Math.floor(Math.random() * (max - min)) + min;
  return songs[randomPick];
}

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

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

//All chat commands

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(`${prefix} pog`)) {
    message.channel.send('gay')
  } else
   if (message.content.startsWith(`${prefix} ednaldo pereira`)) {
    message.channel.send('https://i.imgur.com/Lajk9AM.png')
  } else
   if (message.content.startsWith(`${prefix} meme`)) {
    const connection = await message.member.voice.channel.join();
    const dispacher = connection.play(pickRandomMusic());
  } else
   if (message.content.startsWith(`${prefix} maxuga`)) {
    message.channel.send('https://i.imgur.com/iAsK7Gb.png')
  } else
   if (message.content.startsWith(`${prefix} on`)) {
    await message.guild.me.setNickname('Maxuga [ON]');
    message.channel.send('Agora estou seguindo os outros nas chamadas');
    joinCall = true
  } else
   if (message.content.startsWith(`${prefix} off`)) {
    await message.guild.me.setNickname('Maxuga [OFF]');
    message.channel.send('Agora não estou mais seguindo os outros nas chamadas');
    joinCall = false
  } else
   if (message.content.startsWith(`${prefix} sussy balls`)) {
    const connection = await message.member.voice.channel.join();
    const dispacher = connection.play(songs[7]);
  }
})



client.login(token);
