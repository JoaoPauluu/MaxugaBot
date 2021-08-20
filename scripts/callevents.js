const funcs = require('./functions.js');


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

function follower(oldMember, newMember, client) {
    if(oldMember.member.user.bot) return;
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