const { sh } = require("../../tools/process-runner");
const Command = require("../../models/Command");
const CommandParser = require("../../tools/CommandParser");
const WingsHelp = require("./help/WingsHelp");
const fs = require('fs');

const commands = new CommandParser([new WingsHelp()]);

const usage = `
pti wings - Sets up Wings
`;

class Wings extends Command {
    constructor() {
        super("wings", usage);
    }

    async runCommand(args) {
        if (commands.hasCommand(args)) {
            commands.findAndRun(args);
        } else {
            try {
                console.title("Setting up Wings...");
                await sh("curl -sSL https://get.docker.com/ | CHANNEL=stable bash");
                await sh("systemctl enable --now docker");
                const grub = fs.readFileSync("/etc/default/grub").toString();
                const updatedGrub = grub.replace(`GRUB_CMDLINE_LINUX_DEFAULT=""`, `GRUB_CMDLINE_LINUX_DEFAULT="swapaccount=1"`)
                fs.writeFileSync("/etc/default/grub", updatedGrub);
                console.title("Installing Wings...");
                await sh("mkdir -p /etc/pterodactyl");
                await sh("curl -L -o /usr/local/bin/wings https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_amd64");
                await sh("chmod u+x /usr/local/bin/wings");
                const wingsService = `
                [Unit]
                Description=Pterodactyl Wings Daemon
                After=docker.service
                Requires=docker.service
                PartOf=docker.service
                
                [Service]
                User=root
                WorkingDirectory=/etc/pterodactyl
                LimitNOFILE=4096
                PIDFile=/var/run/wings/daemon.pid
                ExecStart=/usr/local/bin/wings
                Restart=on-failure
                StartLimitInterval=600
                
                [Install]
                WantedBy=multi-user.target`;
                fs.writeFileSync("/etc/systemd/system/wings.service", wingsService);
                await sh("systemctl enable --now wings");
                // await sh("systemctl restart wings");
                
            }
            catch (e) {
                console.printError(e);
            }
        }
    }

}

module.exports = Wings;
