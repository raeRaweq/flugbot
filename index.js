const Discord = require('discord.js');
const bot = new Discord.Client();


const PREFIX  = '#';

var version = '1.0'

bot.on('ready', () =>{
    console.log('FlugBot hebt ab!')
})

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.willkommen === 'member-log');
    if (!channel) return;
    channel.send(`Willkommen im Server, ${member}`);
})

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'youtube':
            message.reply('Flugarmy auf YouTube : https://www.youtube.com/channel/UCZi1ytnX4O-BIribX5I8O9w');
            break;
        case 'uploadplan':
            message.reply('Jeden 2. Tag gibt es Highquality Content von Flugarmy!');
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send('Version ' + version + ' by Raweq');
            }else{
                message.reply('ungültiger Befehl')
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply ('Ups! Es ist ein Fehler unterlaufen!(#clear [nummer]')
            message.channel.bulkDelete(args[1]);
            break;
        

    }
})

bot.login(process.env.token);