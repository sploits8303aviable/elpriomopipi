const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yardım')
        .setDescription('Botun komutları hakkında bilgi verir.'),

    async execute(client, interaction) {
        // Komut listesini burada tanımlayabilirsiniz
        const commands = [
            { name: '/yardım', description: 'Botun komutlarını listeler.' },
            { name: '/rol-ver', description: 'Belirtilen kullanıcıya rol verir.' },
            { name: '/rol-al', description: 'Belirtilen kullanıcıdan rol alır.' },
            { name: '/oto-abone-ayara', description: 'Yapay zeka abone sistemini ayarlar.' },
            { name: '/oto-abone-sıfırla', description: 'Yapay zeka abone sistemini sıfırlar.' },
            { name: '/yenile', description: 'Veritabanını yeniler.' },
            { name: '/ping', description: 'Nortaxın pingini gösterir.' },
        ];

        // Yardım embed'i oluştur
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Yardım Komutları')
            .setDescription('Aşağıda botun komutlarının listesi bulunmaktadır:')
            .setThumbnail(client.user.displayAvatarURL()) // Botun profil resmini ekler
            .setFooter({ text: 'Komutların detayları için ilgili komutu kullanabilirsiniz.' });

        // Komutları embed'e ekle
        commands.forEach(cmd => {
            embed.addFields({ name: cmd.name, value: cmd.description, inline: false });
        });

        // Yardım mesajını gönder
        await interaction.reply({ embeds: [embed] });
    },
};
