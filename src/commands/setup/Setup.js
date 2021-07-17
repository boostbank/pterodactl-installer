const { sh } = require("../../tools/process-runner");
const Command = require("./../../models/Command");
const CommandParser = require("./../../tools/CommandParser");
const InstallHelp = require("./help/InstallHelp");
const generator = require('random-password');
const fs = require('fs');

const commands = new CommandParser([new InstallHelp()]);

const usage = `
pti setup - Sets up Pterodactyl
`;

class Setup extends Command {
    constructor() {
        super("setup", usage);
    }

    async runCommand(args) {
        if (commands.hasCommand(args)) {
            commands.findAndRun(args);
        } else {
            try {
                console.title("Setting up Pterodactyl...");
                await sh("php artisan key:generate --force");
                await sh("php artisan p:environment:setup");
                await sh("php artisan p:environment:database");
                await sh("php artisan p:environment:mail");
                await sh("php artisan migrate --seed --force");
                await sh("php artisan p:user:make");
                await sh("chown -R www-data:www-data /var/www/pterodactyl/*");
                await sh(`(crontab -u root -l ; echo "* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1") | crontab -u root -`)
                await sh("crontab -u root -l");
                console.title("Adding Pterodactyl service...");
                const pService = `# Pterodactyl Queue Worker File
                # ----------------------------------
                
                [Unit]
                Description=Pterodactyl Queue Worker
                After=redis-server.service
                
                [Service]
                # On some systems the user and group might be different.
                # Some systems use 'apache' or 'nginx' as the user and group.
                User=www-data
                Group=www-data
                Restart=always
                ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
                
                [Install]
                WantedBy=multi-user.target" > /etc/systemd/system`
                fs.writeFileSync("/etc/systemd/system/pteroq.service", pService);
                await sh("systemctl enable --now redis-server");
                await sh("systemctl enable --now pteroq.service")
            }
            catch (e) {
                console.printError(e);
            }
        }
    }

}

module.exports = Setup;
