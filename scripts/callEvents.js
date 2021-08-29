const funcs = require('./functions.js');
const mongoUtil = require('./mongoUtil.js');

//Checks if the chasing feature is enabled in the gulid
async function isEnabled(member) {
    const query = { id: `${member.guild.id}`};
    const collection = await mongoUtil.getCol('servers');
    const searchResult = await collection.findOne(query);
    if(!searchResult) {
        await collection.insertOne({ id: `${member.guild.id}`, chase: true});
        await member.guild.me.setNickname('Maxuga [ON]');
        return true;
    } else
    if(searchResult.chase === true) {
        return true;
    } else
    if(searchResult.chase === false) {
        return false;
    } else
    console.log('Algo deu errado!');
}


//Functions that run when the user joins, leaves, or moves channels
async function joinChannel(newUserChannel, client) {
    console.log('User joined the channel', newUserChannel);
    const channel = await client.channels.cache.get(newUserChannel);
    const connection = await channel.join();
    const dispacher = await connection.play(funcs.pickRandomMusic());
}

async function leaveChannel(oldUserChannel, client) {
    console.log('User left the channel', oldUserChannel);
    const channel = await client.channels.cache.get(oldUserChannel);
    channel.leave();
}

async function moveChannel(newUserChannel, oldUserChannel, client) {
    console.log('User moved channels', oldUserChannel, newUserChannel);
    const channel = await client.channels.cache.get(newUserChannel);
    const connection = await channel.join();
    const dispacher = connection.play(funcs.pickRandomMusic());
}


//Check what the user did (joined | left | moved) channels and run the right function
async function follower(oldMember, newMember, client) {
    if(oldMember.member.user.bot) return;
    const chaseEnabled = await isEnabled(newMember);
    if(chaseEnabled == false) return;
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;

    if(oldUserChannel == null) {
        joinChannel(newUserChannel, client);
        return;
    }
    if(newUserChannel == null) {
        leaveChannel(oldUserChannel, client);
        return;
    }
    if(newUserChannel != oldUserChannel) {
        moveChannel(newUserChannel, oldUserChannel, client);
        return;
    }
}



module.exports = {
    follower
}