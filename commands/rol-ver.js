const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rol-ver')
        .setDescription('Bir kullanıcıya belirtilen rolü ver.')
        .addUserOption(option =>
            option.setName('kullanıcı')
                .setDescription('Rolü vereceğiniz kullanıcıyı seçin.')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Verilecek rolü seçin.')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getMember('kullanıcı');
        const role = interaction.options.getRole('rol');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({ content: 'Bu komutu kullanmak için yeterli yetkiniz yok!', ephemeral: true });
        }

        if (user.roles.cache.has(role.id)) {
            return interaction.reply({ content: `${user} kullanıcısında bu rol zaten var.`, ephemeral: true });
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('onayla-ver')
                    .setLabel('Rolü Ver')
                    .setStyle(ButtonStyle.Success), // Yeşil buton
                new ButtonBuilder()
                    .setCustomId('iptal')
                    .setLabel('İptal')
                    .setStyle(ButtonStyle.Danger) // Kırmızı buton
            );

        const reply = await interaction.reply({
            content: `${user} kullanıcısına "${role.name}" rolünü vermek istediğinize emin misiniz?`,
            components: [row],
            ephemeral: true
        });

        const collector = reply.createMessageComponentCollector({ time: 15000 });

        collector.on('collect', async (i) => {
            if (i.customId === 'onayla-ver') {
                await user.roles.add(role);
                await i.update({ content: `${user} kullanıcısına "${role.name}" rolü başarıyla verildi.`, components: [] });
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
