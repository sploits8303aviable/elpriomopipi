const chalk = require("chalk");

module.exports = {
    name: 'ready',
    execute(client) {
        console.log(chalk.red("[BOT] ") + chalk.green(`${client.user.tag} başarıyla başlatıldı.`));

        // Bot durumunu ayarlama
        client.user.setPresence({
            activities: [{ name: 'Nortax İle Sunucunu Güzelleştir!', type: 0 }], // 0 -> Oynuyor (Playing)
            activities: [{ name: '/yardım', type: 0 }], // 0 -> Oynuyor (Playing)
            status: 'online', // online, idle, dnd, invisible
        });

        console.log(chalk.yellow("[BOT] ") + chalk.blue("Durum başarıyla ayarlandı."));
    },
};
