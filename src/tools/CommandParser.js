const Command = require('./../models/Command');
const Map = require('./Map');
const colors = require('colors');

class CommandParser{
    
    constructor(commands){
        this.commands = new Map();
        this.mapCommands(commands);
    }

    mapCommands(commands){
        if(Array.isArray(commands)){
            for (let i = 0; i < commands.length; i++) {
                const command = commands[i];
                if(Command.isValidCommand(command)){
                    this.commands.add(command.cmd, command);
                }
            }
        }
    }

    findAndRun(args){
        if(Array.isArray(args) && args.length > 0){
            const command = args[0];
            // Command should always be in args[0].
            if(this.commands.hasKey(command)){
                const cmd = this.commands.get(args[0]);
                const argsCopy = [...args];
                argsCopy.shift();
                cmd.runCommand(argsCopy);
            }else{
                this.errorOut();
            }
        }else{
            this.errorOut();
        }
    }

    hasCommand(args){
        let has = false;

        if(Array.isArray(args) && args.length > 0){
            const command = args[0];
            has = this.commands.hasKey(command);
        }

        return has;
    }

    errorOut(){
        console.error(colors.bgRed(`Invalid command! ${colors.yellow("Use: pti help")} for help.`));
        process.exit(1);
    }

}

module.exports = CommandParser;