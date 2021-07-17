const { sh } = require("../../tools/process-runner");
const Command = require("./../../models/Command");
const CommandParser = require("./../../tools/CommandParser");
const InstallHelp = require("./help/InstallHelp");
const generator = require('random-password');
const fs = require('fs');

const commands = new CommandParser([new InstallHelp()]);

const usage = `
pti i - Installs Pterodactyl
`;

class Pipeline extends Command {
    constructor() {
        super("i", usage);
        this.randomPassword = this.randomPassword.bind(this);
    }

    async runCommand(args) {
        if (commands.hasCommand(args)) {
            commands.findAndRun(args);
        } else {
            try {
                console.title("Installing tools...");
                await sh('apt-get update')
                await sh("apt-get -y install software-properties-common curl apt-transport-https ca-certificates gnupg");
                await sh("add-apt-repository -y ppa:ondrej/php");
                await sh("add-apt-repository -y ppa:chris-lea/redis-server");
                await sh("curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash");
                await sh("apt-add-repository universe")
                await sh("apt install php8.0-common php8.0-cli -y");
                await sh("apt install php8.0-gd php8.0-mysql php8.0-pdo php8.0-mbstring php8.0-tokenizer php8.0-bcmath php8.0-xml php8.0-fpm php8.0-curl php8.0-zip -y");
                await sh("sudo apt autoremove -y");
                await sh("apt-get install mariadb-server nginx tar unzip git redis-server -y")
                await sh("service mariadb start");
                // Database Install
                console.title("Creating database users and credentials...");
                if(!fs.existsSync("/pti")){
                    fs.mkdirSync("/pti");
                }
                if(fs.existsSync("/pti") && fs.existsSync("/pti/credentials.json")){
                    console.success("Skipping creating credentials... Already created...");
                }else{
                    const panelPassword = this.randomPassword();
                    const serversPassword = this.randomPassword();
                    const phpMyAdminPassword = this.randomPassword();
                    const credentials = {
                        panelPassword,
                        serversPassword,
                        phpMyAdminPassword
                    }
                    fs.writeFileSync("/pti/credentials.json", JSON.stringify(credentials));
                    await sh(`mysql -u root -e "create database IF NOT EXISTS pterodactyl;"`);
                    await sh(`mysql -u root -e "use mysql; CREATE USER IF NOT EXISTS 'panel' IDENTIFIED BY '${panelPassword}';"`, process.cwd(), process.env, true);
                    console.msg(`> mysql -u root -e "use mysql; CREATE USER IF NOT EXISTS 'panel' IDENTIFIED BY '****************';"`);
                    await sh(`mysql -u root -e "use mysql; CREATE USER IF NOT EXISTS 'servers' IDENTIFIED BY '${serversPassword}';"`, process.cwd(), process.env, true)
                    console.msg(`> mysql -u root -e "use mysql; CREATE USER IF NOT EXISTS 'servers' IDENTIFIED BY '****************';"`);
                    await sh(`mysql -u root -e "use mysql; CREATE USER IF NOT EXISTS 'phpmyadmin' IDENTIFIED BY '${phpMyAdminPassword}';"`, process.cwd(), process.env, true)
                    console.msg(`> mysql -u root -e "use mysql; CREATE USER IF NOT EXISTS 'phpmyadmin' IDENTIFIED BY '****************';"`);
                    await sh(`mysql -u root -e "use mysql; GRANT ALL PRIVILEGES ON *.* TO 'panel' IDENTIFIED BY '${panelPassword}';"`, process.cwd(), process.env, true);
                    console.msg(`> mysql -u root -e "use mysql; GRANT ALL PRIVILEGES ON *.* TO 'panel' IDENTIFIED BY '****************';"`);
                    await sh(`mysql -u root -e "use mysql; GRANT ALL PRIVILEGES ON *.* TO 'servers' IDENTIFIED BY '${serversPassword}';"`, process.cwd(), process.env, true)
                    console.msg(`> mysql -u root -e "use mysql; GRANT ALL PRIVILEGES ON *.* TO 'servers' IDENTIFIED BY '****************';"`);
                    await sh(`mysql -u root -e "use mysql; GRANT ALL PRIVILEGES ON *.* TO 'phpmyadmin' IDENTIFIED BY '${phpMyAdminPassword}';"`, process.cwd(), process.env, true)
                    console.msg(`> mysql -u root -e "use mysql; GRANT ALL PRIVILEGES ON *.* TO 'phpmyadmin' IDENTIFIED BY '****************';"`);
                    await sh("curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer");
                }
                // Pterodactyl Install
                console.title("Setting Up Pterodactyl...");
                if(!fs.existsSync("/var/www/pterodactyl")){
                    await sh("mkdir -p /var/www/pterodactyl");
                }
                await sh("wget https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz", "/var/www/pterodactyl");
                await sh("tar -xzvf panel.tar.gz", "/var/www/pterodactyl");
                await sh("chmod -R 755 storage/* bootstrap/cache/", "/var/www/pterodactyl");
                await sh("cp .env.example .env");
                await sh("composer install --no-dev --optimize-autoloader --no-suggest");

            }
            catch (e) {
                console.printError(e);
            }
        }
    }

    randomPassword() {
        return generator(16);
    }

}

module.exports = Pipeline;
