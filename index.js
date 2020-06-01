const Discord = require('discord.js');
const bot = new Discord.Client();


const PREFIX = '#';

var version = '1.1.1'

bot.on('ready', () => {
    console.log('FlugBot hebt ab!')
})

bot.on('message', message => {
    if (!message.guild) return;
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Dafür hast du keine Rechte!")

    if (message.content.startsWith('#kick')) {
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member
                    .kick('Grund')
                    .then(() => {
                        message.reply(`Erfolgreich ${user.tag} gekickt.`);
                    })
                    .catch(err => {
                        message.reply('ich konnte dieses Mitglied nicht kicken');
                        console.error(err);
                    });
            } else {
                message.reply("Dieser User ist nicht im!");
            }
        } else {
            message.reply("du musst die Person erwähnen!");
        }
    }
});

bot.on('message', message => {
    if (!message.guild) return;
    if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Dafür hast du keine Rechte!")

    let banMember = message.mentions.members.first() || message.guild.member
    if (banMember) return message.channel.send("du musst die Person erwähnen!")

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Keinen Grund angegeben!"

    if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Ich habe nicht die Berechtigung dafür!")

    message.delete()

    banMember.send(`Hallo! Du wurdest von ${message.guild.name} gebannt für : ${reason}`).then(() =>
        message.guild.ban(banMember, { days: 1, reason: reason })).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** wurde gebannt!`)

    let embed = new Discord.RichEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ban")
        .addField("Mutee:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Grund:", reason)
        .addField("ZeitPunkt:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "ban-logs")
    sChannel.send(embed)
)


}

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'youtube':
            message.reply('Flugarmy auf YouTube : https://www.youtube.com/channel/UCZi1ytnX4O-BIribX5I8O9w');
            break;
        case 'uploadplan':
            message.reply('Jeden 2. Tag gibt es Highquality Content von Flugarmy!');
            break;
        case 'info':
            if (args[1] === 'version') {
                message.channel.send('Version ' + version + ' by Raweq');
            } else {
                message.reply('ungültiger Befehl')
            }
            break;
        case 'clear':
            if (!args[1]) return message.reply('Ups! Es ist ein Fehler unterlaufen!(#clear [nummer]')
            message.channel.bulkDelete(args[1]);
            break;


    }
})

bot.login(process.env.token);