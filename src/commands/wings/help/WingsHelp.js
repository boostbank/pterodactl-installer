const Command = require('../../../models/Command');
const colors = require('colors');


const helpMessage = `
${colors.yellow("-----WebServer Help-----")}
${colors.grey("Commands:")}
     ${colors.cyan("pti webserver help - Webserver help command.")}
     ${colors.cyan("pti wings - Installs wings.")}
${colors.yellow("-----------------------")}`;

class WingsHelp extends Command{

    constructor(){
        super("help", "pti wings help");
    }

    runCommand(args){
        console.log(helpMessage);
    }

}

module.exports = WingsHelp;