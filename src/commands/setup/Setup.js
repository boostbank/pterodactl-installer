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

            }
            catch (e) {
                console.printError(e);
            }
        }
    }

}

module.exports = Setup;
