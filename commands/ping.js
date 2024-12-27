const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(client,interaction) {
        const ping = client.ws.ping

        const embed = new EmbedBuilder()
            .setTitle(`Ping değerim aşağıda.`)
            .setDescription(`<:ping:1315712056930074676> şuanda gecikmem **${client.ws.ping}** milisaniye.`)

        await interaction.reply({ embeds: [embed] });
    },
};
