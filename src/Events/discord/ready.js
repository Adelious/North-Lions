const { Events, ActivityType } = require('discord.js');
const { GUILD_ID } = require("../../config.json");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await client.user.setPresence({
			activities: [{
				name: 'Simple Roleplay',
				type: ActivityType.Playing,
			}],
			status: 'dnd',
		  })
		  
		  let guild = client.guilds.cache.get(GUILD_ID)

		  await guild.commands.fetch()
		    .then(commands => {
				var commandList = [];
				commands.forEach(command => {
					commandList.push(command.name);
				});
				console.table(commandList);
			})
		    .catch(console.error);

			await console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
