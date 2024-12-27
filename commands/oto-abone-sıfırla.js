const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('croxydb'); // CroxyDB'yi içe aktarıyoruz

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oto-abone-sıfırla')
        .setDescription('Yapay Zeka Abone Sistemini sıfırlar.'),

    async execute(client, interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply('Bu komutu kullanmak için **Yönetici** yetkinizin olması gerekiyor.');
        }

        const guildID = interaction.guild.id;

        // Veritabanındaki tüm abone ayarlarını kaldırıyoruz
        db.delete(`yapayzeka_${guildID}.aboneKanalID`);
        db.delete(`yapayzeka_${guildID}.aboneLogID`);
        db.delete(`yapayzeka_${guildID}.aboneRolID`);
        db.delete(`yapayzeka_${guildID}.aboneKanalAdi`);

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle('<a:onay:1315710302733467678> Abone ayarları sıfırlandı!')
            .setDescription('Tüm abone ayarları başarıyla sıfırlandı.');

        await interaction.reply({ embeds: [embed] });
    },
};
