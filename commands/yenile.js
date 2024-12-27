const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Örneğin JSON dosyası kullanıyorsanız:
const dbPath = path.resolve(__dirname, 'database.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yenile')
        .setDescription('Veritabanını yeniler'),
    async execute(interaction) {
        try {
            // Özel emojiler
            const loadingEmoji = interaction.guild.emojis.cache.get('LOADING_EMOJI_ID'); // Yükleme emojisi ID'si
            const successEmoji = interaction.guild.emojis.cache.get('SUCCESS_EMOJI_ID'); // Başarı emojisi ID'si
            const errorEmoji = interaction.guild.emojis.cache.get('ERROR_EMOJI_ID');     // Hata emojisi ID'si

            // Yenileme işlemi başlıyor
            await interaction.reply(`${loadingEmoji} Veritabanı yenileniyor...`);

            // Veritabanını temizleme ve sıfırlama işlemi
            const initialData = {
                users: [], // Örnek başlangıç verisi
                settings: {}
            };

            fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2)); // Veritabanını sıfırla

            // Başarı mesajı
            await interaction.editReply(`${successEmoji} Veritabanı başarıyla yenilendi.`);
        } catch (error) {
            console.error(error);
            await interaction.editReply(`${errorEmoji} Veritabanını yenilerken bir hata oluştu.`);
        }
    },
};