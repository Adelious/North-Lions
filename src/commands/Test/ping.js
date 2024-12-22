const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply(`Latence du bot: ${Date.now() - interaction.createdTimestamp}ms, Latence de l'API: ${Math.round(interaction.client.ws.ping)}ms`);
  },
};
