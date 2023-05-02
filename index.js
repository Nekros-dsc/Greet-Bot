const { Client } = require('discord.js');
const client = new Client({ intents: 131071 });
const config = require('./config.json');

client.on('ready', () => {
  console.log(`${client.user.tag} est connecté Powered by /novaworld`);
});

client.on('guildMemberAdd', async member => {
  const channels = config.channelIds.map(id => client.channels.cache.get(id)).filter(channel => channel != null);
  for (const channel of channels) {
    const msg = await channel.send(`Welcome to \`${member.guild.name}\`, ${member} !`).catch(() => {});
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);
  }
});

client.login(config.token);

process.on('unhandledRejection', (reason, p) => {
  console.log('[antiCrash] :: Unhandled Rejection/Catch', reason, p);
});

process.on('uncaughtException', err => {
  console.log('[antiCrash] :: Uncaught Exception/Catch', err);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log('[antiCrash] :: Uncaught Exception/Catch (MONITOR)', err, origin);
});

process.on('multipleResolves', (type, promise, reason) => {
  console.log('[antiCrash] :: Multiple Resolves', type, promise, reason);
});