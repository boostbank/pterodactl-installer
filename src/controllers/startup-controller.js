const initConsole = require('../tools/init-console');
const Argument = require('../models/Argument');
const parser = require('./../tools/arg-parser');
const runner = require('./../tools/step-runner');
const CommandParser = require('./../tools/CommandParser');
// Commands
const Help = require('./../commands/help/Help');
const Install = require("./../commands/install/Install");
const Setup = require('../commands/setup/Setup');
const WebServer = require('../commands/webserver/WebServer');

const allowedCommands = [new Help(), new Install(), new Setup(), new WebServer()];

const commands = new CommandParser(allowedCommands);

const start = async (args, appArgs)=>{
    initConsole();
    commands.findAndRun(appArgs);
};



module.exports = start;