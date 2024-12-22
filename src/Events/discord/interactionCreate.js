const Discord = require("discord.js");
const { commandeCategoryID, commandeArchiveCategoryID, recrutementArchiveCategoryID, recrutementCategoryID } = require("../../config.json");

module.exports = {
  name: Discord.Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing /${interaction.commandName}`);
        console.error(error);
      }
    }

    if (interaction.isButton()) {
      // Ticket de support

      if (interaction.customId === "ticket") {
        let channel = await interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          type: Discord.ChannelType.GuildText,
        });

        await channel.setParent(commandeCategoryID);

        await channel.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          EmbedLinks: true,
          SendMessages: true,
          ReadMessageHistory: true,
          AttachFiles: true,
        });

        await interaction.reply({
          content: `Votre demande a correctement été créée : ${channel}`,
          ephemeral: true,
        });

        await channel.setTopic(interaction.user.id);

        let embed = new Discord.EmbedBuilder()
          .setColor(Discord.Colors.Blue)
          .setTitle("Demande de rendez-vous")
          .setThumbnail(
            interaction.client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription("ticket crée")
          .setTimestamp()
          .setFooter({
            text: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL({
              dynamic: true,
            }),
          });


        const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("close-ticket")
            .setLabel("fermer le ticket")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️")
        );

        await channel.send({ embeds: [embed], components: [button] });
      }

      if (interaction.customId === "close-ticket") {
        let user = interaction.client.users.cache.get(
          interaction.channel.topic
        );
        try {
          try {
            await user.send("Votre demande a été fermé");
          } catch (err){
            console.error(err);
          }
          await interaction.reply({
            content: "Le demande a été fermé",
            ephemeral: true,
          });
        } catch (error) {
          console.error(error);
        }

        await interaction.channel.setParent(commandeArchiveCategoryID);

      }

      // Ticket de recrutement 

      if (interaction.customId === "candidature") {

        let channel = await interaction.guild.channels.create({
          name: `candidature-${(interaction.member.nickname !== null) ? interaction.member.nickname.replace(' ', '-') : interaction.user.username }`,
          type: Discord.ChannelType.GuildText,
        });

        await channel.setParent(recrutementCategoryID);

        await channel.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          EmbedLinks: true,
          SendMessages: true,
          ReadMessageHistory: true,
          AttachFiles: true,
        });
        
        await interaction.reply({
          content: `Votre candidature a correctement été créé : ${channel}`,
          ephemeral: true
        });

        await channel.setTopic(interaction.user.id);

        let embed = new Discord.EmbedBuilder()
          .setColor(Discord.Colors.Blue)
          .setTitle("Candidature")
          .setThumbnail(
            interaction.client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription("création de candidature")
          .setTimestamp()
          .setFooter({
            text: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL({
              dynamic: true,
            }),
          });

        const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("close-recrutement")
            .setLabel("fermer la candidature")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️")
        );

        await channel.send({ embeds: [embed], components: [button] });

        channel.send('➔ ** Informations**\n- Nom :\n- Prénom :\n- Âge :\n\n- Disponibilité :\n- Qualité / Défauts :\n\n➔ ** Candidature **\n- Motivations:\n- Pourquoi les Lions et pas une autre ? :\n- Pourquoi vous choisir ? :\n- Que représente la MC pour vous ? :\n\n➔ **Information(s) supplémentaire(s) ** :\n- Description de vous ( attitude / conduite / comportement ... ) :');

      }

      if (interaction.customId === "close-recrutement") {
        let user = interaction.client.users.cache.get(
          interaction.channel.topic
        );
        try {
          await user.send("Votre candidature bien a été fermée.");
          await interaction.reply({
            content: "Le candidature a été fermée.",
            ephemeral: true,
          });
        } catch (error) {
          console.log(error);
        }

        await interaction.channel.setParent(recrutementArchiveCategoryID);
      }
    }
  }
}