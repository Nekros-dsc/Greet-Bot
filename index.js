const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({ intents: 3276799 });

client.login(config.token);
client.on('ready', () => {
    console.log(`[!] — Logged in as ${client.user.tag} (${client.user.id})`);
});

client.on('guildMemberAdd', async (member) => {
  const channels = config.channelIds.map(id => client.channels.cache.get(id)).filter(channel => channel != null);
  for (const channel of channels) {
    const msg = await channel.send(`*Welcome to \`${member.guild.name}\`, ${member} !*`).catch(() => {});
    setTimeout(() => {
      msg.delete().catch(() => {});
    }, 5000);
  }
});