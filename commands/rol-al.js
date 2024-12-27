const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rol-al')
        .setDescription('Bir kullanıcıdan belirtilen rolü al.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Rolü alacağınız kullanıcıyı seçin.')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Alınacak rolü seçin.')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getMember('kullanıcı');
        const role = interaction.options.getRole('rol');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli yetkiniz yok!', ephemeral: true });
        }

        if (!user.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${user} kullanıcısında bu rol zaten yok.`, ephemeral: true });
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('onayla-al')
                    .setLabel('Rolü Al')
                    .setStyle(ButtonStyle.Success), // Yeşil buton
                new ButtonBuilder()
                    .setCustomId('iptal')
                    .setLabel('İptal')
                    .setStyle(ButtonStyle.Danger) // Kırmızı buton
            );

        const reply = await interaction.reply({
            content: `${user} kullanıcısından "${role.name}" rolünü almak istediğinize emin misiniz?`,
            components: [row],
            ephemeral: true
        });

        const collector = reply.createMessageComponentCollector({ time: 15000 });

        collector.on('collect', async (i) => {
            if (i.customId === 'onayla-al') {
                await user.roles.remove(role);
                await i.update({ content: `${user} kullanıcısından "${role.name}" rolü başarıyla alındı.`, components: [] });
            } else if (i.customId === 'iptal') {
                await i.update({ content: 'İşlem iptal edildi.', components: [] });
            }
        });

        collector.on('end', async () => {
            if (!reply.editable) return;
            await reply.edit({ components: [] });
        });
    },
};
