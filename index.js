const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'info') {
        message.channel.send('SimpleHelper, by MST2. - Get it here: https://github.com/MST-2/simplehelper');
    } else if (command === 'version') {
        message.channel.send('You are running version 1.1.0');
    } else if (command === 'serverinfo') {
        message.channel.send(`**Server Info**\nServer name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    } else if (command === 'userinfo') {
        message.channel.send(`**User Info**\nYour username: ${message.author.username}\nYour ID: ${message.author.id}`);
    } else if (command === 'test') {
        if (!args.length) {
            return message.channel.send(`Enter testing input, ${message.author}!`);
        } else if (args[0] === '1') {
            return message.channel.send('test complete');
        }

        // last section is only for pure testing.

        message.channel.send(`First argument: ${args[0]}`);
    } else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!');
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ dynamic: true })}>`;
        });

        message.channel.send(avatarList);
    } else if (command === 'purge') {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('You need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to prune messages in this channel!');
        });
    }
});

client.login(token);