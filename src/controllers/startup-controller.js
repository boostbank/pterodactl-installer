const initConsole = require('../tools/init-console');
const Argument = require('../models/Argument');
const parser = require('./../tools/arg-parser');
const runner = require('./../tools/step-runner');
const CommandParser = require('./../tools/CommandParser');
// Commands
const Help = require('./../commands/help/Help');

const allowedCommands = [new Help()];

const commands = new CommandParser(allowedCommands);

const start = async (args, appArgs)=>{
    initConsole();
    commands.findAndRun(appArgs);
};



module.exports = start;