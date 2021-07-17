const Command = require('./../../../models/Command');
const colors = require('colors');


const helpMessage = `
${colors.yellow("-----Pipeline Help-----")}
${colors.grey("Commands:")}
     ${colors.cyan("pti i help - Pipeline help command.")}
     ${colors.cyan("pti i - Install Pterodactyl.")}
${colors.yellow("-----------------------")}`;

class InstallHelp extends Command{

    constructor(){
        super("help", "pti i help");
    }

    runCommand(args){
        console.log(helpMessage);
    }

}

module.exports = InstallHelp;