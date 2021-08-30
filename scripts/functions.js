const songs = require('./songs.json');
const Discord = require('discord.js');


function pickRandomMusic(min = 0, max = 8) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomPick = Math.floor(Math.random() * (max - min)) + min;
    return songs[randomPick];
};


module.exports = {
    pickRandomMusic
}
