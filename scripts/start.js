function ready(client) {
    //Code that will run when the bot starts
    console.log("Ready!");
    client.user.setPresence({
      status: 'online',
      activity: {
        name: 'maxuga help',
        type: 'PLAYING'
      }
    })
}

function reconnecting() {
    console.log('Reconnecting!');
}

function disconnect() {
    console.log('Disconnected!');
}




module.exports = {
      ready,
      reconnecting,
      disconnect
}