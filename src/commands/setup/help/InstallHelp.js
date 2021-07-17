const Command = require('./../../../models/Command');
const colors = require('colors');


const helpMessage = `
${colors.yellow("-----Pipeline Help-----")}
${colors.grey("Commands:")}
     ${colors.cyan("pti setup help - Pipeline help command.")}
     ${colors.cyan("pti setup - Setup Pterodactyl.")}
${colors.yellow("-----------------------")}`;

class SetupHelp extends Command{

    constructor(){
        super("help", "pti setup help");
    }

    runCommand(args){
        console.log(helpMessage);
    }

}

module.exports = SetupHelp;