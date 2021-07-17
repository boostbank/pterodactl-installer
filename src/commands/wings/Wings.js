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
                console.log(updatedGrub);
                
            }
            catch (e) {
                console.printError(e);
            }
        }
    }

}

module.exports = Wings;
