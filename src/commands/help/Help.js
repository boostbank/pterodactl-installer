const Command = require('./../../models/Command');
const colors = require('colors');


const helpMessage = `
${colors.yellow("-----Help-----")}
${colors.grey("Commands:")}
     ${colors.cyan("pti help - Shows this message.")}
     ${colors.cyan("pti i - Runs full installer")}
${colors.grey("Info:")}
     ${colors.cyan("With any command you may see all config/help.")}
     ${colors.cyan("Example: pti i help")}
${colors.yellow("--------------")}`;

class Help extends Command{

    constructor(){
        super("help", "pti help");
    }

    runCommand(args){
        console.log(helpMessage);
    }

}

module.exports = Help;