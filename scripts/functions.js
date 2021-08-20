const songs = require('./songs.json');
const Discord = require('discord.js');

function helpEmbed() {
  const embedHelp = new Discord.MessageEmbed()
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
   return embedHelp;
}

function pickRandomMusic(min = 0, max = 8) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomPick = Math.floor(Math.random() * (max - min)) + min;
    return songs[randomPick];
};


module.exports = {
    helpEmbed,
    pickRandomMusic
}
