const initConsole = require('../tools/init-console');
const Argument = require('../models/Argument');
const parser = require('./../tools/arg-parser');
const runner = require('./../tools/step-runner');
const CommandParser = require('./../tools/CommandParser');
// Commands
const Help = require('./../commands/help/Help');
const Pipeline = require('./../commands/pipeline/Pipeline');
const SyncVars = require('./../commands/syncvars/SyncVars');
const Npm = require('../commands/npm/Npm');
const Credentials = require('../commands/credentials/Credentials');

const allowedCommands = [new Help(), new Pipeline(), new SyncVars(), new Npm(), new Credentials()];

const commands = new CommandParser(allowedCommands);

const start = async (args, appArgs)=>{
    initConsole();
    commands.findAndRun(appArgs);
};



module.exports = start;